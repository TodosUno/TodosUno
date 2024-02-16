"use client";
import React from "react";
import { useApiContext } from "../../../context/apiContext";
import "./header.css";



const Header = () => {

  const { dataUser, dataCuadro } = useApiContext();

  return (
    <header className="header">
      <p id="logo">TodosUno</p>
      <span className="levelSpan">Nivel {dataUser.nivel}</span>
      <div className="header__content-container">
        <div
          className={`header__content ${
            dataUser.active ? "active" : "inactive"
          }`}
        >
          {dataUser.active ? "Activo" : "Inactivo"} 
        </div>
      
        <span className="header__content"> {dataUser.username}</span>
      </div>
    </header>
  );
};

export default Header;
