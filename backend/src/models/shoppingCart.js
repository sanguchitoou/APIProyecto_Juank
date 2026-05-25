//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import mongoose, { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quanity: {
          type: Number,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("shoppingCart", shoppingCartSchema);
