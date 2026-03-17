//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    stock:{
        type: Number
    },
}, {
    timestamps: true,
    strick: false
})

export default model("products", productsSchema)