import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import shoppingCartController from "../controllers/shoppingCart.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(shoppingCartController.getShoppingCarts)
  .post(shoppingCartController.insertShoppingCarts);

//Por ID
router
  .route("/:id")
  .get(shoppingCartController.getShoppingCartsById)
  .put(shoppingCartController.updateShoppingCarts)
  .delete(shoppingCartController.deleteShoppingCarts);

export default router;
