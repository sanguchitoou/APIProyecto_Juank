//Creamos un array de métodos DENTRO de la carpeta controlador
const branchesController = {};

//Importamos el Schema de la colección que vamos a utilizar
import branchesModel from "../models/branches.js";

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
branchesController.getBranches = async (request, response) => {
  const branches = await branchesModel.find();
  //Devolvemos la respuesta
  response.json(branches);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
branchesController.insertBranches = async (request, response) => {
  const { name, address, schedule, isActive } = request.body;
  //Llenamos la instancia con el schema creado
  const newBranche = new branchesModel({ name, address, schedule, isActive });
  //Guardamos en la base de datos
  await newBranche.save();
  //Imprimimos la respuesta
  response.json({ message: "Sucursal guardada existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
branchesController.updateBranches = async (request, response) => {
  const { name, address, schedule, isActive } = request.body;
  //Actualizamos el registro por ID
  await productsModel.findByIdAndUpdate(
    request.params.id,
    {
      name,
      address,
      schedule,
      isActive,
    },
    { new: true },
  );
  //Imprimimos la respuesta
  response.json({ message: "Sucursal actualizada existosamente" });
};

//Realizamos el DELETE
branchesController.deleteBranches = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await productsModel.findByIdAndDelete(request.params.id);
  //Eliminamos el registro
  response.json({ message: "Sucursal eliminada exitosamente" });
};

//Exportamos TODO
export default branchesController;
