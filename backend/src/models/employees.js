//Aca irán los campos que se utilizarán en modelos según la colección en Mongo
import mongoose, { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    salary: {
      type: Number,
    },
    DUI: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    idBranches: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branches",
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("employees", employeesSchema);
