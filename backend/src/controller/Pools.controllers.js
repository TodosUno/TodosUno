import Pools from "../models/Pools";
import Cuadros from "../models/Cuadros"
import Users from "../models/Users";

export const createPool = async (req, res) => {
  try {
    const { nivel, minimum } = req.body;
    const newPool = new Pools({
      nivel: nivel,
      minimum: minimum,
    });

    await newPool.save();

    res
      .status(201)
      .json({ message: "Pool created successfully", data: newPool });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the pool",
      error: error.message,
    });
  }
};

export const getAllPools = async (req, res) => {
  try {
    const pools = await Pools.find();
    res.status(200).json(pools);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the pools",
      error: error.message,
    });
  }
};


export const agregarApool = async (req,res) => {
try{
const {username} = req.body;

const referalF = username.referral_father;

const userF = await Users.findOne({username:referalF})

const nivel = userF.nivel;

const pool = await Pools.findOne({nivel:nivel})

const cuadroEncontrado = pool.cuadros.find(cuadro => cuadro.legend === referalF)

if (cuadroEncontrado) { 

  console.log("pool corresp", pool.nivel)
  console.log("cuadroencontrado", cuadroEncontrado)

  if (!cuadroEncontrado.lado_derecho.guide) {
    console.log("falta el lado derecho")
    cuadroEncontrado.lado_derecho.guide = username.username;
    await Pools.findOneAndUpdate(
      { nivel: nivel, "cuadros.legend": referalF },
      { $set: { "cuadros.$.lado_derecho.guide": username.username } }
    );

    return res.status(200).json({msg:"ok"})
  }
  if (!cuadroEncontrado.lado_izquierdo.guide) {
    console.log("falta el lado izq")
    cuadroEncontrado.lado_izquierdo.guide = username.username;
    
       // Save the changes using findOneAndUpdate
       await Pools.findOneAndUpdate(
        { nivel: nivel, "cuadros.legend": referalF },
        { $set: { "cuadros.$.lado_izquierdo.guide": username.username } }
      );
    return res.status(200).json({msg:"ok"})
  }
}

 res.status(201).json({msg:"todavia no tiene cuadro"})
}
catch(err) {
res.status(404).json(err)
}
}

export const getPoolById = async (req, res) => {
  try {
    const poolId = req.params.id;
    const pool = await Pools.findById(poolId);

    if (!pool) {
      return res.status(404).json({ message: "Pool not found" });
    }
    res.status(200).json({ data: pool });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the pool",
      error: error.message,
    });
  }
};
