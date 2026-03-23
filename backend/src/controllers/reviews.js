//Creamos un array de métodos DENTRO de la carpeta controlador
const reviewsController = {};

//Importamos el Schema de la colección que vamos a utilizar
import reviewsModel from "../models/reviews.js";

//Realizamos el SELECTd
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
reviewsController.getReviews = async (request, response) => {
  const reviews = await reviewsModel.find();
  //Devolvemos la respuesta
  response.json(reviews);
};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
reviewsController.insertReviews = async (request, response) => {
  const { idEmployee, idProduct, rating, comments } = request.body;
  //Llenamos la instancia con el schema creado
  const newReview = new reviewsModel({
    idEmployee,
    idProduct,
    rating,
    comments,
  });
  //Guardamos en la base de datos
  await newReview.save();
  //Imprimimos la respuesta
  response.json({ message: "Review guardada existosamente" });
};

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la REQUEST y la RESPONSE
reviewsController.updateReviews = async (request, response) => {
  const { idEmployee, idProduct, rating, comments } = request.body;
  //Actualizamos el registro por ID
  await reviewsModel.findByIdAndUpdate(
    request.params.id,
    {
      idEmployee,
      idProduct,
      rating,
      comments,
    },
    { new: true },
  );
  //Imprimimos la respuesta
  response.json({ message: "Review actualizada existosamente" });
};

//Realizamos el DELETE
reviewsController.deleteReviews = async (request, response) => {
  //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
  await reviewsModel.findByIdAndDelete(request.params.id);
  //Eliminamos el registro
  response.json({ message: "Review eliminada exitosamente" });
};

//Exportamos TODO
export default reviewsController;
