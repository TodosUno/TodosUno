import Pools from "../models/Pools";
import Users from "../models/Users";
import Cuadros from "../models/Cuadros";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const cuadroId = async (req, res) => {
  try {
    const { cuadroId } = req.params;

    const cuadro = await Cuadros.findById(cuadroId);

    res.json(cuadro);
  } catch (error) {
    console.log(error);
  }
};

export const cuadroPadre = async (req, res) => {
  try {
    const { cuadroDirection, father } = req.params;

    const cuadro = await Cuadros.findOne({ legend: father });

    if (!cuadro) {
      // Si cuadro es null, significa que no se encontró ningún cuadro
      return res.status(200).json({ estado: false });
    }

    if (cuadroDirection === "derecha") {
      if (!cuadro.lado_derecho || !cuadro.lado_derecho.builders1.username || !cuadro.lado_derecho.builders2.username)
        return res.status(200).json({ estado: true });
    } else if (cuadroDirection === "izquierda") {
      if (!cuadro.lado_izquierdo || !cuadro.lado_izquierdo.builders1.username || !cuadro.lado_izquierdo.builders2.username)
        return res.status(200).json({ estado: true });
    }

    res.status(201).json({ estado: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const cuadroHijo = async (req, res) => {
  try {
    const { cuadroId } = req.params;

    const cuadro = await Cuadros.findOne({legend:cuadroId});

    res.status(200).json(cuadro);
  } catch (error) {
    console.error(error);
    // Manejar el error según tus necesidades
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 


/*
export const hijoLevel = async (req, res) => {
  try {
    const {username} = req.params;
   
    const user = 

    if (!dataCuadro) {
      // Si el cuadro no se encuentra, responde con un mensaje de error
      return res.status(404).json({ message: 'Cuadro no encontrado' });
    }


    res.status(200).json("borrado satisfactoriament");
  } catch (error) {
    console.log(error);
  }
};*/


export const deleteCuadro = async (req, res) => {
  try {
    const {dataCuadro} = req.body;
   
    if (!dataCuadro) {
      // Si el cuadro no se encuentra, responde con un mensaje de error
      return res.status(404).json({ message: 'Cuadro no encontrado' });
    }

    const cuadro = await Cuadros.findByIdAndDelete(dataCuadro._id);

    res.status(200).json("borrado satisfactoriament");
  } catch (error) {
    console.log(error);
  }
};

export const createCuadros = async (req, res) => {
  try {
    const { dataCuadro, prop1, prop2  } = req.body;

    
    if (prop1 === "derecho" ) {
   
      if ( prop2 === "builders1") {
        let cuadroDerecho = {
          guide: dataCuadro.lado_derecho.builders1.username,
        };
        let cuadro = new Cuadros({
          poolId: dataCuadro.poolId,
          legend: dataCuadro.lado_derecho.guide,
          lado_derecho: cuadroDerecho,
          lado_izquierdo:{guide:""},
          cuadroPadre_id: dataCuadro._id
        });
      
      const pool = await Pools.findById(dataCuadro.poolId);
      pool.cuadros.push(cuadro);
      await pool.save();
      await cuadro.save();
      const guide = await Users.findOne({ username:dataCuadro.lado_derecho.guide });
      const builder = await Users.findOne({ username:dataCuadro.lado_derecho.builders1.username });
      guide.cuadro_id = cuadro._id
      builder.cuadro_id = cuadro._id
      await guide.save();
      await builder.save();
      return res.status(200).json({msg:"nuevo cuadro"});
      }
      if (prop2 === "builders2") {
        let cuadroIzq = {
          guide: dataCuadro.lado_derecho.builders2.username,
        };
        let cuadro = new Cuadros({
          poolId: dataCuadro.poolId,
          legend: dataCuadro.lado_derecho.guide,
          lado_derecho:{guide:""},
          lado_izquierdo:cuadroIzq,
          cuadroPadre_id: dataCuadro._id
        });
        const pool = await Pools.findById(dataCuadro.poolId);
      pool.cuadros.push(cuadro);
      await pool.save();
      await cuadro.save();
      const guide = await Users.findOne({ username:dataCuadro.lado_derecho.guide });
      const builder = await Users.findOne({ username:dataCuadro.lado_derecho.builders2.username });
      guide.cuadro_id = cuadro._id
      builder.cuadro_id = cuadro._id
      await guide.save();
      await builder.save();
      return res.status(200).json({msg:"nuevo cuadro"})
      }

    }

    if (prop1 === "izquierdo") {
   
      if ( prop2 === "builders1") {
        let cuadroIzquierdo = {
          guide: dataCuadro.lado_izquierdo.builders1.username,
        };
        let cuadro = new Cuadros({
          poolId: dataCuadro.poolId,
          legend: dataCuadro.lado_izquierdo.guide,
          lado_izquierdo:{guide:""},
          lado_derecho:cuadroIzquierdo,
          cuadroPadre_id: dataCuadro._id
        });
        const pool = await Pools.findById(dataCuadro.poolId);
        pool.cuadros.push(cuadro);
        await pool.save();

        await cuadro.save();
        const guide = await Users.findOne({ username:dataCuadro.lado_izquierdo.guide });
        const builder = await Users.findOne({ username:dataCuadro.lado_izquierdo.builders1.username });
        guide.cuadro_id = cuadro._id
        builder.cuadro_id = cuadro._id
        await guide.save();
        await builder.save();
        return res.status(200).json({msg:"nuevo cuadro"})
      }

      if (prop2 === "builders2") {
        let cuadroIzquierdo = {
          guide: dataCuadro.lado_izquierdo.builders2.username,
        };
        let cuadro = new Cuadros({
          poolId: dataCuadro.poolId,
          legend: dataCuadro.lado_izquierdo.guide,
          lado_izquierdo: cuadroIzquierdo,
          lado_derecho:{guide:""},
          cuadroPadre_id: dataCuadro._id
        });
      
        const pool = await Pools.findById(dataCuadro.poolId);
      pool.cuadros.push(cuadro);
      await pool.save();
      await cuadro.save();
      const guide = await Users.findOne({ username:dataCuadro.lado_izquierdo.guide });
      const builder = await Users.findOne({ username:dataCuadro.lado_izquierdo.builders2.username });
      guide.cuadro_id = cuadro._id
      builder.cuadro_id = cuadro._id
      await guide.save();
      await builder.save();
      return res.status(200).json({msg:"nuevo cuadro"})
      }}
  
   /* if(dataCuadro && prop1 && prop2) {
      res.status(202).json("todo ok")
    } */
    // Resto del código si es necesario
  } catch (error) {
    console.error(error);
    // Manejar el error según tus necesidades
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
    




export const traerCuadroPadre = async (req,res) => {
  const { padre, hijo, nieto } = req.body;

  try {
    const cuadro = await Cuadros.findOne({ legend: padre });
  
    if (cuadro) {
      // Buscar al hijo en el lado derecho
      if (cuadro.lado_derecho && cuadro.lado_derecho.guide === hijo) {
        console.log(`El hijo ${hijo} está en el lado derecho del cuadro.`);
        cuadro.lado_derecho.builders2.username = nieto;
        cuadro.save();
      }
  
      // Buscar en el lado izquierdo si no se encontró en el lado derecho
      else if (cuadro.lado_izquierdo && cuadro.lado_izquierdo.guide === hijo) {
        console.log(`El hijo ${hijo} está en el lado izquierdo del cuadro.`);
        cuadro.lado_izquierdo.builders2.username = nieto;
        cuadro.save();

      } else {
        console.log(`El hijo ${hijo} no fue encontrado en los lados del cuadro.`);
      }
    } else {
      console.log(`Cuadro con legend ${padre} no encontrado.`);
    }
  } catch (error) {
    console.error('Error al buscar el cuadro:', error);
  }
}

export const traerCuadroPadreSub = async (req,res) => {
  const { hijo, nieto1, nieto2 } = req.body;

  try {
    
    const nivel = hijo.nivel;

    const pool = await Pools.findOne({nivel:nivel})

    let cuadroEncontrado;

    if (hijo.direction === "derecha") {

     cuadroEncontrado = pool.cuadros.find(cuadro => cuadro.lado_derecho.guide === hijo.username)
    }
    if (hijo.direction === "izquierda") {

     cuadroEncontrado = pool.cuadros.find((cuadro => cuadro.lado_izquierdo.guide === hijo.username))
    }

    console.log("cuadro encontrado para completar", cuadroEncontrado);
    
    const cuadroId = cuadroEncontrado._id;
    
    const cuadro = await Cuadros.findById(cuadroId);

    console.log("cepcID", cuadroId)
    console.log("cepc", cuadro)

    if (cuadro) {
      // Buscar al hijo en el lado derecho
      if (cuadro.lado_derecho && cuadro.lado_derecho.guide === hijo.username) {
        console.log(`El hijo ${hijo.username} está en el lado derecho del cuadroxxx.`);

        if (cuadro.lado_derecho.builders1.username && cuadro.lado_derecho.builders1.username === nieto1 ) {
          cuadro.lado_derecho.builders2.username = nieto2;
          cuadro.save();
          return res.status(201).json({msg:"todo ok"})
        }
        else if (cuadro.lado_derecho.builders1.username && cuadro.lado_derecho.builders1.username === nieto2) {
          cuadro.lado_derecho.builders2.username = nieto1;
          cuadro.save();
          return res.status(202).json({msg:"todo ok"})
        }
        else if (cuadro.lado_derecho.builders2.username && cuadro.lado_derecho.builders2.username === nieto1) {
          cuadro.lado_derecho.builders1.username = nieto2;
          cuadro.save();
          return res.status(203).json({msg:"todo ok"})
        }
        else if (cuadro.lado_derecho.builders2.username && cuadro.lado_derecho.builders2.username === nieto2) {
          cuadro.lado_derecho.builders1.username = nieto1;
          cuadro.save();
          return res.status(204).json({msg:"todo ok"})
        }
      }
  
      // Buscar en el lado izquierdo si no se encontró en el lado derecho
      else if (cuadro.lado_izquierdo && cuadro.lado_izquierdo.guide === hijo.username) {
        console.log(`El hijo ${hijo.username} está en el lado izquierdo del cuadroooo.`);
        console.log("cuadro",cuadro)
        if (cuadro.lado_izquierdo.builders1.username && cuadro.lado_izquierdo.builders1.username === nieto1 ) {
          cuadro.lado_izquierdo.builders2.username = nieto2;
          cuadro.save();
          console.log("opcion1")
          return res.status(205).json({msg:"todo ok"})
        }
        else if (cuadro.lado_izquierdo.builders1.username && cuadro.lado_izquierdo.builders1.username === nieto2) {
          cuadro.lado_izquierdo.builders2.username = nieto1;
          cuadro.save();
          console.log("opcion2")
          return res.status(206).json({msg:"todo ok"})
        }
        else if (cuadro.lado_izquierdo.builders2.username && cuadro.lado_izquierdo.builders2.username === nieto1) {
          cuadro.lado_derecho.builders1.username = nieto2;
          cuadro.save();
          console.log("opcion3")
          return res.status(207).json({msg:"todo ok"})
        }
        else if (cuadro.lado_izquierdo.builders2.username && cuadro.lado_izquierdo.builders2.username === nieto2) {
          cuadro.lado_izquierdo.builders1.username = nieto1;
          cuadro.save();
          console.log("opcion4")
          return res.status(208).json({msg:"todo ok"})
        }

      } else {
        console.log(`El hijo ${hijo} no fue encontrado en los lados del cuadro.`);
      }
    } else {
      console.log(`Cuadro con legend no encontrado.`);
    } 
  } catch (error) {
    console.error('Error al buscar el cuadro:', error);
  }
}

export const everyOneActive = async (req,res) => {
 

  try {
     
    const { cuadroId } = req.params;

    const cuadro = await Cuadros.findById(cuadroId);

    let builders1 = await Users.findOne({username:cuadro.lado_derecho.builders1.username})
    let builders2 = await Users.findOne({username:cuadro.lado_derecho.builders2.username})
    let builders3 = await Users.findOne({username:cuadro.lado_izquierdo.builders1.username})
    let builders4 = await Users.findOne({username:cuadro.lado_izquierdo.builders2.username})

    if (
      builders1.active === true &&
      builders2.active === true &&
      builders3.active === true &&
      builders4.active === true 
    ) {
      res.status(200).json({ estado: true});
    }

    res.status(201).json({estado:false})
  } catch (error) {
    console.error('Error al buscar el cuadro:', error);
  }
}


/* 
      // Verificar si alguna propiedad en dataCuadro está vacía
      const propiedades = Object.keys(dataCuadro);
      for (const propiedad of propiedades) {
        if (dataCuadro[propiedad] === null || dataCuadro[propiedad] === "") {
          console.log("esta vacia");
          return;
        }
      }
  
      if (
        !dataCuadro.lado_derecho.builders1 ||
        !dataCuadro.lado_derecho.builders2 ||
        !dataCuadro.lado_izquierdo.builders1 ||
        !dataCuadro.lado_izquierdo.builders2
      ) {
       // console.log("No se encuentran las propiedades builder", dataCuadro);
        return;
      }
      // Si todas las propiedades tienen valores, dispara la función
    setAscender(true);

    };*/