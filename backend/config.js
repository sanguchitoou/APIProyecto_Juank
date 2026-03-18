//Importamos el DOT
import dotenv from "dotenv";

//Ejecutamos la librería DOT
dotenv.config()

//Exportamos la librería
export const config = {
    db:{
        URI: process.env.DB_URI
    }
}