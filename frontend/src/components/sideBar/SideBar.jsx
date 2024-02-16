"use client";
import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useApiContext } from "../../../context/apiContext";
import Cookies from "js-cookie";
import clipboardCopy from "clipboard-copy";
import InactiveUsers from "../inactiveUsers/inactiveUsers";

const SideBar = () => {
  
  const pathname = usePathname();
  const { dataUser, setLegend, setFatherComplete , setAscender} = useApiContext();
  const [isOpen, setIsOpen] = useState(false); // Cambiado a false para cerrar por defecto en pantallas pequeñas


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

const referralLink = `https://oficialtodosuno.com/register?username=${dataUser.username}`;
// const referralLink = `http://localhost:3000/register?username=${dataUser.username}`;

//START= "nodemon index.js --exec babel-node"

  const copyToClipboard = () => {
    clipboardCopy(referralLink);
    alert("Enlace copiado al portapales");
  };

  const nonActive = () => {
    alert ("No puedes compartir el enlace porque no eres usuario activo")
  }


  const router = useRouter();

  // Usar useEffect para manejar el cambio en isOpen cuando el ancho de la ventana cambie
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    // Agregar el listener de evento
    window.addEventListener("resize", handleResize);
    // Llamar a handleResize inicialmente para establecer isOpen
    handleResize();
    // Remover el listener de evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const cerrarSession = async () => {
     Cookies.remove('token');
    router.push("/login")
    setLegend(false)
    setFatherComplete(false)
    setAscender(false);
  }

  return (
    <div className={`sideBar ${isOpen ? "open" : "closed"}`}>
      <div
        className={`sideBar__toggle-container ${isOpen ? "" : "closed"}`}
        onClick={toggleSidebar}
      >
        <Icon
          onClick={toggleSidebar}
          className="toggleButton"
          icon={
            isOpen ? "ri:arrow-left-double-line" : "ri:arrow-right-double-line"
          }
        />
      </div>
      <nav className={`sideBar_bottom ${!isOpen ? "hidden" : ""}`}>
        <ul className="sideBar_list">
        
          <li> 
          <Icon icon="majesticons:home-line" /> <Link href={"/"}>Volver al inicio</Link>
          </li>
          <li><Icon icon="majesticons:user-line" />{dataUser.username ? dataUser.username : ""}</li> 
          <li onClick={cerrarSession}><Icon icon="majesticons:logout" />Cerrar sesión</li>
          
          { dataUser.active ? <li onClick={copyToClipboard}><Icon
            icon="fa-solid:copy"
            className="dashboardPage__referral-link-icon"/>{" "}
            Link de invitación</li> : <li onClick={nonActive}><Icon
            icon="fa-solid:copy"
            className="dashboardPage__referral-link-icon"/>{" "}
            Link de invitación</li> }
          
            <InactiveUsers/>
          
      
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

