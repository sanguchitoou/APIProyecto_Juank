//Importamos el Schema de la colección que vamos a utilizar
import customersModel from "../models/customers.js";
//Importamos las librerías necesarias para realizar recuperación exitosa
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js";
import bcrypt from "bcryptjs";

//Creamos un array de métodos DENTRO de la carpeta controlador
const recoveryPasswordController = {};

//Realizamos la función para la realización del login
recoveryPasswordController.requestCode = async (request, response) => {
  //1. Solicitamos los datos
  const { email } = request.body;

  //Validamos el formato del código
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //Comparamos
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    //2. Buscamos el correo electrónico en la base de datos
    const customerFound = await customersModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if (!customerFound) {
      return response.status(400).json({ message: "Email no encontrado " });
    }

    //Generamos un código aleatorio para la verificación del correo
    const verificationCode = crypto.randomBytes(3).toString("hex");

    //Guardamos en un token el código de verificación y el correo del usuario
    const token = jsonwebtoken.sign(
      //1. Lo que queremos guardar en el token
      {
        email,
        verificationCode,
        userType: "Customer",
        verified: false,
      },
      //2. La clave secreta para firmar el token
      config.JWT.SECRET,
      //3. Opciones del token (tiempo de expiración)
      { expiresIn: "15m" },
    );

    //Lo guardamos en la cookie
    response.cookie("recoveryCookie", token, {
      //Veremos esto luego
      /* httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", */
      maxAge: 15 * 60 * 1000, //15 minutos
    });

    //1. Enviamos el código por correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS,
      },
    });

    //2. Creación del mailoptions, que contiene el correo del destinatario, el asunto y el cuerpo del mensaje
    const mailOptions = {
      from: config.EMAIL.USER,
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Hola, tu código de verificación es: ${verificationCode} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu recuperación de contraseña.`,
      html: HTMLRecoveryEmail(verificationCode),
    };

    //3. Enviamos el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo: " + error);
        return response
          .status(400)
          .json({ message: "Error al enviar el correo" });
      }
      return response
        .status(200)
        .json({ message: "Correo de verificación enviado exitosamente" });
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return response.status(500).json({ message: "Error interno del servidor" });
  }
};

//Verificar el código de verificación
recoveryPasswordController.verifyCode = async (request, response) => {
  //Solicitamos los datos
  const { verificationCodeRequest } = request.body;

  try {
    //Extraemos los datos del token
    const token = request.cookies.recoveryCookie;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    if (verificationCodeRequest !== decoded.verificationCode) {
      return response
        .status(400)
        .json({ message: "Código de verificación inválido" });
    }

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        userType: "Customer",
        verified: true,
      },
      config.JWT.SECRET,
      { expiresIn: "15m" },
    );

    //Lo guardamos en la cookie
    response.cookie("recoveryCookie", newToken, {
      //Veremos esto luego
      /* httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", */
      maxAge: 15 * 60 * 1000, //15 minutos
    });

    //Retornamos la respuesta
    return response
      .status(200)
      .json({ message: "Código verificado exitosamente" });
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Creamos el método para restablecer la contraseña
recoveryPasswordController.newPassword = async (request, response) => {
  try {
    //1. Solicitamos los datos
    const { newPassword, confirmPassword } = request.body;

    //Comparamos las contraseñas
    if (newPassword !== confirmPassword) {
      return response
        .status(400)
        .json({ message: "La contraseña no coincide" });
    }

    //Comprobamos que la constante verified que está en el token ya esté en true
    const token = request.cookies.recoveryCookie;
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    //Verificamos
    if (!decoded.verified) {
      return response.status(400).json({ message: "Código no verificado" });
    }

    //Encriptamos la contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    //Guardamos la contraseña
    await customersModel.findOneAndUpdate(
      { email: decoded.email },
      { password: passwordHash },
      { new: true },
    );

    //Limpiamos la cookie
    response.clearCookie("recoveryCookie");

    //Retornamos la respuesta
    return response
      .status(200)
      .json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Exportamos la función
export default recoveryPasswordController;
