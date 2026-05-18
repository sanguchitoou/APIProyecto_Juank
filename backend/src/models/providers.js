//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import { Schema, model } from "mongoose";

const providersSchema = new Schema({
    name:{
        type: String
    },
    phone:{
        type: String
    },
    image:{
        type: String
    },
    //Poder borrar la imagen de cloudinary
    public_id:{
        type: String
    },
}, 
{
    timestamps: true,
    strict: false
})

export default model("providers", providersSchema)