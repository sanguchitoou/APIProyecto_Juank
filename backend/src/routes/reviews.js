import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import reviewsController from "../controllers/reviews.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.insertReviews);

//Por ID
router.route("/:id")
.put(reviewsController.updateReviews)
.delete(reviewsController.deleteReviews);

export default router;