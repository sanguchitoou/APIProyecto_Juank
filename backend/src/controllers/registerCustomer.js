//Importamos las librerías para realizar todo el proceso de encriptación y envío de correos
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const registerCustomerController = {};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
registerCustomerController.registerClient = async (request, response) => {
  const { name, lastName, birthDate, email, password, isVerified } =
    request.body;
  //Llenamos la instancia con el schema creado
  const newReview = new reviewsModel({
    idEmployee,
    idProduct,
    rating,
    comments,
  });

  //Colocamos un trycatch para canalizar errores
  try {
    //Guardamos en la base de datos
    await newReview.save();
    //Imprimimos la respuesta
    response.status(200).json({ message: "Review guardada existosamente" });
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

export default registerCustomerController;
