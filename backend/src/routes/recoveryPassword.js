import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/requestCode").post(recoveryPasswordController.requestCode);
router.route("/verifyCode").post(recoveryPasswordController.verifyCode);
router.route("/newPassword").post(recoveryPasswordController.newPassword);

export default router;
