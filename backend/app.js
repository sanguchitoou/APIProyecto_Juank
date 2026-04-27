import express from "express";
//Importamos TODOS los ENDPOINTS para ser utilizados en el endpoint principal
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js";
import customersRouters from "./src/routes/customers.js";
import registerCustomerController from "./src/routes/registerCustomer.js";
import registerEmployeeController from "./src/routes/registerEmployee.js";
import registerAdminController from "./src/routes/registerAdmin.js";
import customerLoginRoutes from "./src/routes/customerLogin.js";
import recoveryPassword from "./src/routes/recoveryPassword.js";
import logout from "./src/routes/logout.js";
import cookieParser from "cookie-parser";
//Importamos para usar CORS
import cors from "cors";

//Crear una constante que guarda la instancia EXPRESS
const app = express();

//Utilizamos la librería de las cookies para utilizarlas
app.use(cookieParser());
//Utilizamos la librería de CORS para utilizarlas
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
//Hacemos que acepte los JSON de donde sea
app.use(express.json());

/* ACA VAN TODOS LOS ENDPOINTS!!! */
app.use("/api/products", productRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/customers", customersRouters);

//ENDPOINTS ESPECIALES
app.use("/api/registerCustomers", registerCustomerController);
app.use("/api/registerEmployees", registerEmployeeController);
app.use("/api/registerAdmins", registerAdminController);
app.use("/api/loginCustomers", customerLoginRoutes);
app.use("/api/logout", logout);
app.use("/api/recoveryPassword", recoveryPassword);

//Exportamos la función EXPRESS
export default app;
