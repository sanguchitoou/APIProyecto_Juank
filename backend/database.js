import mongoose from "mongoose";

//Cadena de conexión hacia MongoDB
mongoose.connect("mongodb://localhost:27017/megapacaDB");

//Creamos una constante para ver si realmente nos conectamos a MongoDB
const connection = mongoose.connection;

//Por si se conecta, saberlo
connection.once("open", ()=>{
    console.log("Conexión a la DB exitosamente")
})

//Por si NO se conecta
connection.on("disconnected", (error)=>{
    console.log("No se pudo conectar a la DB" + error)
})

//Cuando da error
connection.on("error", (error)=>{
    console.log("No se pudo establecer una conexión a la DB" + error)
})