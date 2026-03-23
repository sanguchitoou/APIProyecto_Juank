//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import mongoose, { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
  {
    idEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("reviews", reviewsSchema);
