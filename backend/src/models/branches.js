//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    schedule: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("branches", productsSchema);
