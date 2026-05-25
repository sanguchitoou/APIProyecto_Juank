//Importamos el Schema de la colección que vamos a utilizar
import shoppingCart from "../models/shoppingCart.js";
import productsModel from "../models/products.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const shoppingCartController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
shoppingCartController.getShoppingCarts = async (request, response) => {
  const shoppingCarts = await shoppingCart
    .find()
    .populate("customerId", "name email")
    .populate("products.productId", "name price");
  //Devolvemos la respuesta
  response.json(shoppingCarts);
};

//Realizamos el SELECT BY ID
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
shoppingCartController.getShoppingCartsById = async (request, response) => {
  const shoppingCarts = await shoppingCart
    .findById(request.params.id)
    .populate("customerId", "name email")
    .populate("products.productId", "name price");

  //Si no se encuentra el carrito de compras, devolvemos un mensaje de error
  if (!shoppingCarts) {
    return response
      .status(404)
      .json({ message: "Carrito de compras no encontrado" });
  }
  //Devolvemos la respuesta
  response.json(shoppingCarts);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
shoppingCartController.insertShoppingCarts = async (request, response) => {
  const { customerId, products, status } = request.body;

  //Variable para guardar el total
  let total = /* products.reduce((acc, product) => acc + product.price * product.quantity, 0); */ 0;

  //Arreglo para productos
  const newProducts = [];
  //Iteramos sobre los productos para llenar el arreglo

  for (let i = 0; i < products.length; i++) {
    //Consultamos el producto por ID para obtener su precio
    const productFound = await productsModel.findById(products[i].productId);
    //Calculamos el subtotal del producto
    const subtotal = productFound.price * products[i].quantity;
    //Sumamos el subtotal al total
    total += subtotal;
    //Si no se encuentra el producto, devolvemos un mensaje de error
    if (!productFound) {
      return response.status(404).json({
        message: `Producto con ID ${products[i].productId} no encontrado`,
      });
    }

    //Llenamos el arreglo de productos con la información necesaria
    newProducts.push({
      productId: products[i].productId,
      quantity: products[i].quantity,
      subtotal: subtotal,
    });
  }
  //Llenamos la instancia con el schema creado
  const newShoppingCart = new shoppingCart({
    customerId,
    products: newProducts,
    total,
  });

  //Guardamos en la base de datos
  await newShoppingCart.save();
  //Imprimimos la respuesta
  response.json({ message: "Carrito de compras guardado existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
shoppingCartController.updateShoppingCarts = async (request, response) => {
  //Lo mismo que el insert pero con la función de actualización
  const { customerId, products, status } = request.body;

  //Variable para guardar el total
  const total = /* products.reduce((acc, product) => acc + product.price * product.quantity, 0); */ 0;

  //Arreglo para productos
  const newProducts = [];
  //Iteramos sobre los productos para llenar el arreglo

  for (let i = 0; i < products.length; i++) {
    //Consultamos el producto por ID para obtener su precio
    const productFound = await productsModel.findById(products[i].productId);
    //Calculamos el subtotal del producto
    const subtotal = productFound.price * products[i].quantity;
    //Sumamos el subtotal al total
    total += subtotal;
    //Si no se encuentra el producto, devolvemos un mensaje de error
    if (!productFound) {
      return response.status(404).json({
        message: `Producto con ID ${customerId.products[i].productId} no encontrado`,
      });
    }

    //Llenamos el arreglo de productos con la información necesaria
    newProducts.push({
      productId: products[i].productId,
      quantity: products[i].quantity,
      subtotal: subtotal,
    });
  }
  //Llenamos la instancia con el schema creado
  const updateShoppingCarts = await shoppingCart.findByIdAndUpdate(
    request.params.id,
    {
      customerId,
      products: newProducts,
      total,
      status,
    },
    { new: true },
  );

  //Guardamos en la base de datos
  await updateShoppingCarts.save();
  //Imprimimos la respuesta
  response.json({ message: "Carrito de compras actualizado existosamente" });
};

//Realizamos el DELETE
shoppingCartController.deleteShoppingCarts = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await shoppingCart.findByIdAndDelete(request.params.id);
  //Eliminamos el registro
  response.json({ message: "Carrito de compras eliminado exitosamente" });
};

//Exportamos TODO
export default shoppingCartController;
