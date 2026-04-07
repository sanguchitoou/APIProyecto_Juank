//Importamos el Schema de la colección que vamos a utilizar
import customersModel from "../models/customers.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const customersController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
customersController.getCustomers = async (request, response) => {
  try {
    const customers = await customersModel.find();
    //Devolvemos la respuesta
    return response.status(200).json(customers);
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
customersController.updateCustomers = async (request, response) => {
  try {
    const {
      name,
      lastName,
      birthDate,
      email,
      password,
      isVerified,
      loginAttemps,
      timeOut,
    } = request.body;
    //Agregamos validacione
    name = name?.trim();
    email = email?.trim();

    //Validación de Requieres
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Datos requeridos" });
    }

    //Validación de fecha
    if (birthDate > new Date() || birthDate <= new Date("1901-01-01")) {
      return res.status(400).json({ message: "Fecha de nacimiento inválida" });
    }

    //Actualizamos el registro por ID
    await customersModel.findByIdAndUpdate(
      request.params.id,
      {
        name,
        lastName,
        birthDate,
        email,
        password,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );
    //Imprimimos la respuesta
    return response
      .status(200)
      .json({ message: "Cliente actualizado existosamente" });
  } catch (error) {
    console.log("error " + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Realizamos el DELETE
customersController.deleteCustomers = async (request, response) => {
  try {
    //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
    await customersModel.findByIdAndDelete(request.params.id);
    //Eliminamos el registro
    return response
      .status(200)
      .json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.log("error" + error);
    return response.status(500).json({ message: "Internal Server Error 500" });
  }
};

//Exportamos TODO
export default customersController;
