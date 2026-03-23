import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import branchesController from "../controllers/branches.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
.get(branchesController.getBranches)
.post(branchesController.insertBranches);

//Por ID
router.route("/:id")
.put(branchesController.updateBranches)
.delete(branchesController.deleteBranches);

export default router;