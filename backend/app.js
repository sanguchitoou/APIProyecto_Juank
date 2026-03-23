import express from "express";
//Importamos TODOS los ENDPOINTS para ser utilizados en el endpoint principal
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js";

//Crear una constante que guarda la instancia EXPRESS
const app = express();

//Hacemos que acepte los JSON de donde sea
app.use(express.json());

/* ACA VAN TODOS LOS ENDPOINTS!!! */
app.use("/api/products", productRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);

//Exportamos la función EXPRESS
export default app;
