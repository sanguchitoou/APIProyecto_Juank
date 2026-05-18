//Importamos el Schema de la colección que vamos a utilizar
import providersModel from "../models/providers.js";
//Importamos la librería de cloudinary
import { v2 as cloudinary } from "cloudinary";

//Creamos un array de métodos DENTRO de la carpeta controlador
const providersController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
providersController.getProviders = async (request, response) => {
  const providers = await providersModel.find();
  //Devolvemos la respuesta
  response.status(200).json(providers);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
providersController.insertProviders = async (request, response) => {
  const { name, phone } = request.body;
  //Llenamos la instancia con el schema creado
  const newProvider = new providersModel({
    name,
    phone,
    image: request.params.path,
    public_id: request.file.filename,
  });
  //Guardamos en la base de datos
  await newProvider.save();
  //Imprimimos la respuesta
  response.status(201).json({ message: "Proveedor guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
providersController.updateProviders = async (request, response) => {
  const { name, phone } = request.body;
  //Actualizamos el registro por ID
  const providerFound = await providersModel.findById(request.params.id);

  const updateData = {
    name,
    phone,
  };

  if (request.file) {
    //Eliminamos la imagen anterior
    await cloudinary.uploader.destroy(providerFound.destroy);

    //Guardamos la nueva imagen
    updateData.image = request.file.path;
    updateData.public_id = request.file.filename;
  };

  //Guardamos la respuesta
  await providersModel.findByIdAndUpdate(
    request.params.id, updateData, {new: true}
  )

  //Imprimimos la respuesta
  response.status(200).json({ message: "Review actualizada existosamente" });
};

//Realizamos el DELETE
providersController.deleteProvider = async (req, res) => {
    const providerFound = await providersModel.findById(req.params.id)

    //Elimino la imagen de Cloudinary
    await cloudinary.uploader.destroy(providerFound.public_id)

    //Elimino al usuario de la base de datos
    await providersModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({message: "Provider deleted"})
}

//Exportamos TODO
export default providersController;
