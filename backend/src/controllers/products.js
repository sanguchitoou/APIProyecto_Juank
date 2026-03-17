//Creamos un array de métodos DENTRO de la carpeta controlador
const productsController = {};

//Importamos el Schema de la colección que vamos a utilizar
import productsModel from "../models/products.js";

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.getProducts = async (request, response) =>{
    const products = await productsModel.find();
    //Devolvemos la respuesta
    response.json(products);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.insertProducts = async (request, response) =>{
    const {name, description, price, stock} = request.body;
    //Llenamos la instancia con el schema creado
    const newProduct = new productsModel({name, description, price, stock})
    //Guardamos en la base de datos
    await newProduct.save()
    //Imprimimos la respuesta
    response.json({message: "Producto guardado existosamente"});
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.updateProducts = async (request, response) =>{
    const {name, description, price, stock} = request.body;
    //Actualizamos el registro por ID
    await productsModel.findByIdAndUpdate(request.params.id, {
        name,
        description,
        price,
        stock
    }, {new: true});
    //Imprimimos la respuesta
    response.json({message: "Producto actualizado existosamente"});
};

//Realizamos el DELETE
productsController.deleteProducts = async (request, response) => {
    //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
    await productsModel.findByIdAndDelete(request.params.id);
    //Eliminamos el registro
    response.json({ message: "Producto eliminado exitosamente" });
};

//Exportamos TODO
export default productsController;