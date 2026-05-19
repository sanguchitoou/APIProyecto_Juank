import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import productsController from "../controllers/products.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router
  .route("/")
  .get(productsController.getProducts)
  .post(productsController.insertProducts);

//Router que tiene los GET PERSONALIZADOS
router.route("/lowStock").get(productsController.getProductLowStock);
router.route("/priceRange").post(productsController.getProductByPriceRange);
router.route("/countProduct").get(productsController.getCountProducts);
router.route("/searchProduct").post(productsController.getSearchByName);

//Por ID, ACÁ SÍ importa el orden
router
  .route("/:id")
  //Único GET por ID dentro del route
  .get(productsController.getProductById)
  .put(productsController.updateProducts)
  .delete(productsController.deleteProducts);

export default router;
