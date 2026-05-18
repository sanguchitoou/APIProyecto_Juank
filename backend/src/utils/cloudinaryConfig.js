//Importamos el multer
import multer from "multer";
//Importamos las librerías que nos ayudarán a la creación de la subida de archivos a claudinary
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../../config.js";

//Iniciamos la configuración de cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY.NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET,
});

//Configurar el cómo guardaremos las imágenes
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Grupo1B",
        allowed_formats: ["jpg", "png", "jpeg", "gif"]
    }
})

//Configuramos el multer
const upload = multer({storage})

//Exportamos el multer
export default upload
