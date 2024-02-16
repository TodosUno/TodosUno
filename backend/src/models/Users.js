import { Schema, model, mongoose } from "mongoose";

const Users = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    referral_father: {
      type: String,
    },
    cuadro_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuadros",
    },
    //poolId: {
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: "Pools",
    //},
    referidos: {
      type: Array,
    },
    nivel: {
      type: Number,
      default: 10,
    },
    
    active:{
      type: Boolean, 
      default:false
    },
    complete:{
      type: Boolean, 
      default:false
    },
    direction:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default model("Users", Users);

/*nivel2: {
      type: Boolean,
      default: false,
    },
    nivel3: {
      type: Boolean,
      default: false,
    },
    nivel4: {
      type: Boolean,
      default: false,
    },
    nivel5: {
      type: Boolean,
      default: false,
    },
    nivel6: {
      type: Boolean,
      default: false,
    },
    nivel7: {
      type: Boolean,
      default: false,
    },
    nivel8: {
      type: Boolean,
      default: false,
    },
    nivel9: {
      type: Boolean,
      default: false,
    },
    nivel10: {
      type: Boolean,
      default: false,
    },*/