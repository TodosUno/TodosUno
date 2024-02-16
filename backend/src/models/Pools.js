import { Schema, model } from "mongoose";

const Pools = new Schema({
  nivel: {
    type: Number,
    unique: true,
  },
 /* minimum: {
    type: String,
    unique: false,
  },*/
  cuadros: {
    type: [],
    ref: "Cuadros",
  },
});

export default model("Pools", Pools);
