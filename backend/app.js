import express from "express";
//Importamos TODOS los ENDPOINTS para ser utilizados en el endpoint principal
import productRoutes from "./src/routes/products.js";

//Crear una constante que guarda la instancia EXPRESS
const app = express();

/* ACA VAN TODOS LOS ENDPOINTS!!! */
app.use("/api/products", productRoutes);

//Exportamos la función EXPRESS
export default app;