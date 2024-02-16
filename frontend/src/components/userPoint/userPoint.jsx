import React from 'react'
import "../mandala/mandala.css"


const userPoint = ({ x,y,propiedadUsuario,active }) => {
  return (
    <div className="punto" style={{ left: `${x}%`, top: `${y}%` }}>
    <p className='userName'>{propiedadUsuario}</p>
  </div>
  
  )
}
export default userPoint;

