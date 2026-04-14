import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import customerLoginController from "../controllers/customerLogin.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(customerLoginController.login);

export default router;
