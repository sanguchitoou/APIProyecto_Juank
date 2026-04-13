import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import registerEmployeeController from "../controllers/registerEmployee.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(registerEmployeeController.registerEmployees);

//Código de verificación de EMAIL
router.route("/verifyCodeEmail").post(registerEmployeeController.verifyCode);

export default router;
