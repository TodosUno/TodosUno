import { Schema, model, mongoose } from "mongoose";

const Cuadros = new Schema({
  poolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pools",
  },
  cuadroPadre_id:{
    type: mongoose.Schema.Types.ObjectId,
  },
  legend: {
    type: String,
  },
  lado_derecho: {
    guide: {
      type: String,
    },
    builders1: {
      username: {
        type: String,
      },
      active: {
        type: Boolean,
      },
    },
    builders2: {
      username: {
        type: String,
      },
      active: {
        type: Boolean,
      },
    },
    isFinished: {
      type: Boolean,
    },
  },

  lado_izquierdo: {
    guide: {
      type: String,
    },
    builders1: {
      username: {
        type: String,
      },
      active: {
        type: Boolean,
      },
    },
    builders2: {
      username: {
        type: String,
      },
      active: {
        type: Boolean,
      },
    },
    isFinished: {
      type: Boolean,
    },
  },
  isFinalized: {
    type: Boolean,
  },
});


export default model("Cuadros", Cuadros);

