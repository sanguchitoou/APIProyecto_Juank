import express from "express";

//Crear una constante que guarda la instancia EXPRESS
const app = express();

/* ACA VAN TODOS LOS ENDPOINTS!!! */
app.use("/api/products");

//Exportamos la función EXPRESS
export default app;