import mongoose from "mongoose";

//Cadena de conexión hacia MongoDB
mongoose.connect("mongodb://localhost:27017/megapacaDB");

//Creamos una constante para ver si realmente nos conectamos a MongoDB
const conexion = mongoose.connect();

//Por si se conecta, saberlo
conexion.once("open", ()=>{
    console.log("Conexión a la DB exitosamente")
})

//Por si NO se conecta
conexion.once("disconnected", (error)=>{
    console.log("No se pudo conectar a la DB" + error)
})

//Cuando da error
conexion.once("error", (error)=>{
    console.log("No se pudo establecer una conexión a la DB" + error)
})