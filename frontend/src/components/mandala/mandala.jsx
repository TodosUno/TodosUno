import React from 'react'
import UserPoint from "../userPoint/userPoint"
import "./mandala.css"
import { useApiContext } from "../../../context/apiContext";


const Mandala = () => {

    const { dataUser, dataCuadro } = useApiContext();

  
  const puntos = window.innerWidth <= 767 ? [
      { x: 34, y: 45, propiedadUsuario: dataCuadro?.legend, active: true },
      { x: 69, y: 45, propiedadUsuario: dataCuadro?.lado_derecho?.guide, active: true },
      { x: -1, y: 45, propiedadUsuario: dataCuadro?.lado_izquierdo?.guide, active: true },
      { x: -9, y: 25, propiedadUsuario: dataCuadro?.lado_izquierdo?.builders1?.username, active: true },
      { x: -9, y: 65, propiedadUsuario: dataCuadro?.lado_izquierdo?.builders2?.username, active: true },
      { x: 76, y: 25, propiedadUsuario: dataCuadro?.lado_derecho?.builders1?.username, active: true },
      { x: 76, y: 65, propiedadUsuario: dataCuadro?.lado_derecho?.builders2?.username, active: false },
  ] : [
      { x: 28, y: 45, propiedadUsuario: dataCuadro?.legend, active: true },
      { x: 85, y: 45, propiedadUsuario: dataCuadro?.lado_derecho?.guide, active: true },
      { x: -29, y: 45, propiedadUsuario: dataCuadro?.lado_izquierdo?.guide, active: true },
      { x: -59, y: 5, propiedadUsuario: dataCuadro?.lado_izquierdo?.builders1?.username, active: true },
      { x: -59, y: 85, propiedadUsuario: dataCuadro?.lado_izquierdo?.builders2?.username, active: true },
      { x: 115, y: 5, propiedadUsuario: dataCuadro?.lado_derecho?.builders1?.username, active: true },
      { x: 115, y: 85, propiedadUsuario: dataCuadro?.lado_derecho?.builders2?.username, active: false },
      // ... Agrega más coordenadas según tu diseño
  ];
  

   return (
    <div className="mandala-container">
    {dataCuadro && dataCuadro.lado_izquierdo &&
      puntos.map((coordenada, index) => (
        <UserPoint
          key={index}
          x={coordenada.x}
          y={coordenada.y}
          active={coordenada.active}
          propiedadUsuario={coordenada.propiedadUsuario ?? ""}
        />
      ))}
  </div>

  );
}

export default Mandala