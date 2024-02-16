import bcrypt from "bcrypt";
import Users from "../models/Users";
import Cuadros from "../models/Cuadros";
import Pools from "../models/Pools";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const registerUser = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;
    const { referralUser } = req.params;
    if (!email || !username || !name) {
      return res
        .status(400)
        .json({ message: "The fields email, username, and name are required" });
    }

    const existingUser = await Users.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with the same email or username already exists",
      });
    }
    let newUser;

    
    if (referralUser) {
      const referral = await Users.findOne({ username: referralUser });

      if (referral.referidos.length >= 2) {
      //  console.log(referral.referidos[0])
        return res.status(412).json({
          message: "No podes referir mas",
        });
      }


      const referido = referral.referidos[0]

      if (referido) {
      //  console.log(referido)  
        const referral2 = await Users.findOne({ username: referido });
        if (referral2.active == false) {
        return res.status(413).json({
          message: "Todavia no activo a su primer referido",
        });
      } 
      }
      
     //console.log("no existe referido")

      const hashedPassword = await bcrypt.hash(password, 10);
      
      if (referral.referidos.length === 0) {
        newUser = new Users({
          email: email,
          username: username,
          name: name,
          password: hashedPassword,
          referral_father: referralUser,
          cuadro_id: referral.cuadro_id,
          poolId: referral.poolId,
          direction:"derecha"
  
        });
      }

      if (referral.referidos.length === 1) {
        newUser = new Users({
          email: email,
          username: username,
          name: name,
          password: hashedPassword,
          referral_father: referralUser,
          cuadro_id: referral.cuadro_id,
          poolId: referral.poolId,
          direction:"izquierda"
  
        });
        const pool = await Pools.findOne({nivel:referral.nivel});
  
        const indiceCuadro = pool.cuadros.findIndex((cuadro) => cuadro.legend === referral.username);
  
        if (indiceCuadro !== -1) {
        pool.cuadros[indiceCuadro].lado_izquierdo.guide = username;
        console.log ("agregado al pool", pool.cuadros[indiceCuadro].lado_izquierdo.guide);
        }
        await pool.save(); 
      }
      

 // ACA ENCUENTRA EL CUADRO DE TU REFER
      const cuadro = await Cuadros.findById(referral.cuadro_id);
      //console.log(cuadro)

   
      if (cuadro.legend === referralUser) {
        if (referral.referidos.length === 0) {
          cuadro.lado_derecho.guide = username;
        } else if (referral.referidos.length === 1) {
          cuadro.lado_izquierdo.guide= username;
        }

      }

      if (cuadro.lado_derecho.guide === referralUser) {
        if (referral.referidos.length === 0) {
          cuadro.lado_derecho.builders1.username = username;
           // abrirle su propio cuadro -->  lado_derecho.guide;
          

        } else if (referral.referidos.length === 1) {
          cuadro.lado_derecho.builders2.username = username;
        }
      }

      if (cuadro.lado_izquierdo.guide === referralUser) {
        if (referral.referidos.length === 0) {
          cuadro.lado_izquierdo.builders1.username = username;
        } else if (referral.referidos.length === 1) {
          cuadro.lado_izquierdo.builders2.username = username;
        }
      } 
      
      referral.referidos.push(username);
      await newUser.save();
      await cuadro.save();
     await referral.save();

     if (referral.referidos.length === 2) {
        const ref = await Users.findOne({username:referralUser}) 
        ref.complete = true;
        ref.save();
      } 
    }
    
    res.status(200).json({ message: "User successfully registered", data: newUser });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};






export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required fields" });
    }

    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        cuadroId: user.cuadro_id,
      },
      process.env.PASS_TOKEN,
      { expiresIn: "100m" },
      { algorithm: "HS256" }
    );

    res.status(200).json({ message: "Login Ssuccessful", token: token });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing the login",
      error: error.message,
    });
  }
};
