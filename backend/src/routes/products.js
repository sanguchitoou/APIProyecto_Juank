import express from "express";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/")
.get()
.post();

router.route("/:id")
.put()
.delete();

export default router;