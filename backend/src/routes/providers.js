import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import providersController from "../controllers/providers.js";
//Importamos el cloudinary config
import uploadCloudinary from "../utils/cloudinaryConfig.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
  .get(providersController.getProviders)
  .post(uploadCloudinary.single("image"), providersController.insertProviders)

//Por ID
router.route("/:id")
  .put(uploadCloudinary.single("image"), providersController.updateProviders)
  .delete(providersController.deleteProvider);

export default router;
