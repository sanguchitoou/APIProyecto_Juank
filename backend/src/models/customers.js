//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthdate: {
      type: Date,
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
    logginAttemps: {
      type: Number,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("customers", customersSchema);
