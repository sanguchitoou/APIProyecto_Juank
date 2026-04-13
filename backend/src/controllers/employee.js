//Creamos un array de métodos DENTRO de la carpeta controlador
const employeesController = {};

//Importamos el Schema de la colección que vamos a utilizar
import employeesModel from "../models/employees.js";

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
employeesController.getEmployees = async (request, response) => {
  const employees = await employeesModel.find();
  //Devolvemos la respuesta
  response.json(employees);
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
employeesController.updateEmployees = async (request, response) => {
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    request.body;
  //Actualizamos el registro por ID
  await employeesModel.findByIdAndUpdate(
    request.params.id,
    {
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password,
      idBranches,
    },
    { new: true },
  );
  //Imprimimos la respuesta
  response.json({ message: "Empleado actualizado existosamente" });
};

//Realizamos el DELETE
employeesController.deleteEmployees = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await employeesModel.findByIdAndDelete(request.params.id);
  //Eliminamos el registro
  response.json({ message: "Empleado eliminado exitosamente" });
};

//Exportamos TODO
export default employeesController;
