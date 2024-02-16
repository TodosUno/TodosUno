"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const ApiContext = createContext();

export const useApiContext = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {

  const [dataUser, setDataUser] = useState({});
  const [dataUsers, setDataUsers] = useState([]);
  const [dataCuadro, setDataCuadro] = useState({});
  const [inactiveUsers, setInactiveUsers] = useState ({});
  const [reset, setReset] = useState(false);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [legend, setLegend] = useState(false)
  const [hijoDer, setHijoDer] = useState(false);
  const [hijoIzq, setHijoIzq] = useState(false);
  const [fatherComplete ,setFatherComplete] = useState(false);
  const [ascender, setAscender] = useState(false);

  

 const remindFatherFn = async () => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}user/remindFatherFn`,  // Ajusta la ruta según tu configuración
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    ); 
    
    const json = await res.json();

    if (json.complete == true) {
      setFatherComplete(json.complete)
    }   
  }

 catch (error) {
  console.error("Error con el fatherFn:", error)
 }}

  const deleteCuadro = async () => {
    try {
      if (!dataCuadro._id) {
        console.error("El cuadro no existe", dataCuadro);
        return;
      } 
      // Llamar a tu función activar usuario
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/delete`,  // Ajusta la ruta según tu configuración
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataCuadro }),
        }
      );
      const json = await res.json();
      console.log("cuadro borrado:", dataCuadro._id);
    } catch (error) {
      console.error("Error al agregar el campo:", error);
    } 
  };

  const deleteUser = async (username) => {
    try {
      if (!username) {
        console.error("El nombre de usuario no puede estar vacío");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}user/deleteUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
  
      if (res.status === 205) {
        // La solicitud fue exitosa, puedes realizar alguna acción aquí si es necesario
        console.log("Usuario borrado exitosamente:", username);
      } else {
        // La solicitud no fue exitosa, puedes manejar el error aquí
        console.error("Error al borrar usuario:",username, res.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const activarUsuario = async (username) => {
    try {
      if (!username) {
        console.error("El nombre de usuario no puede estar vacío");
        return;
      }
      // Llamar a tu función activar usuario
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}user/activarUsuario`,  // Ajusta la ruta según tu configuración
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const json = await res.json();
      console.log("username del api", username);
    } catch (error) {
      console.error("Error al agregar el campo:", error);
    } 
  };

  const desactivarUsuario = async (username) => {
    try {
      if (!username) {
        console.error("El nombre de usuario no puede estar vacío");
        return;
      }
      // Llamar a tu función activar usuario
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}user/desactivarUsuario`,  // Ajusta la ruta según tu configuración
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const json = await res.json();
      console.log("username del api", username);
    } catch (error) {
      console.error("Error al agregar el campo:", error);
    } 
  };


  const cambiarEstadoComplete = async () => {

    const user = dataUser.username;
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND}user/cambiarEstadoComplete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    
    })

    console.log("apretando") 
  }

 /* const cambiarEstadoCompletePadre = async () => {

    const user = dataUser;
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND}user/cambiarEstadoCompletePadre`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    
    })
  }*/


  
  const traerCuadroPadre = async () => {

    const padre = dataUser.referral_father 
    const hijo = dataUser.username;
    const nieto = dataUser.referidos[1];
    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/traerCuadroPadre`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ padre, hijo, nieto }),
      
      }
    );
    console.log("funcion padre activada")
  }

    
  const traerCuadroPadreSub = async () => {

    
    const hijo = dataUser;
    const nieto1 = dataCuadro.lado_derecho.guide;
    const nieto2 = dataCuadro.lado_izquierdo.guide;


    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/traerCuadroPadreSub`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hijo, nieto1, nieto2 }),
      
      }
    );
    console.log("funcion padre sub activada")
  }
  
  const cuadroIdHijo = async () => {

    const hijoDer1 = dataCuadro.lado_derecho.guide;
    const hijoIzq1 = dataCuadro.lado_izquierdo.guide;

    if (hijoDer1) {
      const res1 = await fetch(

        `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/cuadroHijo/${hijoDer1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json1 = await res1.json();
      if (json1 === null) {
        console.log("tenemos el mismo cuadro id")
        //console.log(hijoDer)
      }
      //si existe significa que no tienen el mismo cuadro id
      else {
       // console.log("no tenemos el mismo cuadro id")
        setHijoDer(true)
      }
    }

    
    if (hijoIzq1) {
      const res2 = await fetch(

        `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/cuadroHijo/${hijoIzq1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json2 = await res2.json();
      if (json2 === null) {
        console.log("tenemos el mismo cuadro id")
       // console.log(hijoIzq)

      }
      //si existe significa que no tienen el mismo cuadro id
      else {
        setHijoIzq(true)
      }
  
    }
  } 

  const createCuadros = async (prop1, prop2, userHijo) => {
    try {
      if (!dataCuadro) {
        console.error("no hay cuadro con data");
        return;
      }
      // Llamar a tu función activar usuario
      
     const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/createCuadros`,  // Ajusta la ruta según tu configuración
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataCuadro,prop1, prop2, userHijo }),
        }
      );
    //  console.log("data del cuadro API", json); 
      console.log("la prop llega bien",prop1, prop2, userHijo)

     // const json = await res.json();
    } catch (error) {
      console.error("Error al enviar dataCuadro:", error);
    } 
  };
  


  useEffect(() => {

    const fetchData = async () => {
      try {

        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND}user/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        setDataUser(json);
     
  
        // Verificar si cuadro_id no es null antes de hacer la segunda solicitud
        if (json.cuadro_id !== null) {

          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/${json.cuadro_id}`
          );
          const json2 = await res2.json();
          setDataCuadro(json2);
        
          let json3;
          if (json.username != "Pablo10") {
          const res3 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/cuadroPadre/${json.direction}/${json.referral_father}`);
        
            json3 = await res3.json();}
       
        
          if (
            json3 &&
            json3.estado === true &&
            json.nivel !== 10 &&
            json2.lado_derecho &&
            json2.lado_derecho.guide &&
            json2.lado_izquierdo &&
            json2.lado_izquierdo.guide &&
            json2.legend === json.username) {
          console.log("No soy nivel 10 y ambos guías están presentes");
          json.complete = true;
        } 

          if(json.username === json2.legend) {
            setLegend(true)
          }

         if (
          json2.lado_derecho&&
          json2.lado_derecho.builders1 &&
          json2.lado_derecho.builders2 &&
          json2.lado_izquierdo &&
          json2.lado_izquierdo.builders1 &&
          json2.lado_izquierdo.builders2
         ) {
          const res4 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BACKEND}cuadro/everyOneActive/${json2._id}`
          );
          const json4 = await res4.json();
          if (json4.estado === true) {
            setAscender(true)
          
          } }
        
        
          setLoading(true);

          const res5 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BACKEND}user/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const json5 = await res5.json();
          setDataUsers(json5);
         
          const inactiveUsersList = json5.filter(user => user.active !== true);
          console.log(inactiveUsersList)
  
          console.log(json2)
          const filter2 = inactiveUsersList.filter((user) => {
            const username = user.username;
            return (
              username &&
              json2.lado_derecho &&
              json2.lado_izquierdo &&
              (
                username === json2.lado_derecho.builders1?.username ||
                username === json2.lado_derecho.builders2?.username ||
                username === json2.lado_izquierdo.builders1?.username ||
                username === json2.lado_izquierdo.builders2?.username
              )
            );
          });
          
          console.log("filter", filter2)
          setInactiveUsers(filter2)
          
        } 

      } catch (error) {
        console.error("Error fetching private dataaa:", error);
      }
      finally {
        setLoading(false); // Indicar que los datos se han cargado
      }
    };
    

    fetchData();

  }, [token, reset]);

  return (
    <ApiContext.Provider value={{ dataUser, dataCuadro, setToken, setReset, loading, 
    inactiveUsers, setInactiveUsers, activarUsuario, desactivarUsuario, legend, setLegend, deleteCuadro, deleteUser, 
    traerCuadroPadre, traerCuadroPadreSub, cuadroIdHijo, hijoDer, hijoIzq, cambiarEstadoComplete, createCuadros, fatherComplete ,
    setFatherComplete ,remindFatherFn, ascender, setAscender}}>
      {children}
    </ApiContext.Provider>
  );
};


