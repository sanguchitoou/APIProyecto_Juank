import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import employeesController from "../controllers/employee.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(employeesController.getEmployees)
  .post(employeesController.inserEmployees);

//Por ID
router
  .route("/:id")
  .put(employeesController.updateEmployees)
  .delete(employeesController.deleteEmployees);

export default router;
