//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("admin", adminSchema);
