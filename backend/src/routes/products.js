import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import productsController from "../controllers/products.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts);

//Por ID
router.route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts);

export default router;