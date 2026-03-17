//Importamos el APP de nuestro archivo
import app from "./app.js";

//Creamos una funcion para ejecutar el servidor
async function main (){
    app.listen(3000);
    console.log("server port on 3000");
}

main();