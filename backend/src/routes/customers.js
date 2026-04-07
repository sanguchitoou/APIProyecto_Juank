import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import customersController from "../controllers/customers.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
  .get(customersController.getCustomers)
  //Haremos un POST especial luego
  //.post(customersController.)

//Por ID
router.route("/:id")
  .put(customersController.updateCustomers)
  .delete(customersController.deleteCustomers);

export default router;
