//Importamos el Schema de la colección que vamos a utilizar
import productsModel from "../models/products.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const productsController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.getProducts = async (request, response) => {
  const products = await productsModel.find();
  //Devolvemos la respuesta
  response.json(products);
  d;
};

//Realizamos el SELECT BY ID
productsController.getProductById = async (request, response) => {
  const product = await productsModel.findById(request.params.id);
  //Realizamos el if
  if (!product) {
    return response.status(404).json({ message: "Producto no encontrado" });
  }
  //Devolvemos la respuesta
  return response.status(200).json(product);
};

//Realizamos un SELECT que retorne un stock bajo
productsController.getProductLowStock = async (request, response) => {
  const products = await productsModel.find({ stock: { $lt: 5 } });
  //Realizamos el if
  if (!products) {
    return response
      .status(404)
      .json({ message: "No hay productos con bajo stock" });
  }
  //Devolvemos la respuesta
  return response.status(200).json(products);
};

//Realizamos SELECT con filtros de precio (slider)
productsController.getProductByPriceRange = async (request, response) => {
  //Definimos las variables de los rangos
  const { min, max } = request.body;
  //Funcion await
  const products = await productsModel.find({
    price: { $gte: min, $lte: max },
  });
  //Realizamos el if
  if (!products) {
    return response
      .status(404)
      .json({ message: "No hay productos con ese rango de precio" });
  }
  //Devolvemos la respuesta
  return response.status(200).json(products);
};

//Realizamos el SELECT para contar cuantos elementos hay en una colección
productsController.getCountProducts = async (request, response) => {
  const productsCount = await productsModel.countDocuments();
  //Devolvemos la respuesta
  return response.status(200).json(productsCount);
};

//Realizamos el SELECT para buscar productos por nombre
productsController.getSearchByName = async (request, response) => {
  //Variable a la que nos referimos para buscar
  const { name } = request.body;
  const products = await productsModel.find({
    name: { $regex: name, $options: "i" },
  });
  //Devolvemos la respuesta
  return response.status(200).json(products);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.insertProducts = async (request, response) => {
  const { name, description, price, stock } = request.body;
  //Llenamos la instancia con el schema creado
  const newProduct = new productsModel({ name, description, price, stock });
  //Guardamos en la base de datos
  await newProduct.save();
  //Imprimimos la respuesta
  response.json({ message: "Producto guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
productsController.updateProducts = async (request, response) => {
  const { name, description, price, stock } = request.body;
  //Actualizamos el registro por ID
  await productsModel.findByIdAndUpdate(
    request.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );
  //Imprimimos la respuesta
  response.json({ message: "Producto actualizado existosamente" });
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
