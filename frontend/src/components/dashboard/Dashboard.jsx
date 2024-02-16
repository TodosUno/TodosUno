"use client";
import { useEffect, useState } from "react";
import "./dashboard.css";
import { useApiContext } from "../../../context/apiContext";
import Mandala from "../mandala/mandala"
import InactiveUsers from "../inactiveUsers/inactiveUsers"


const Dashboard = () => {
   
  const { dataCuadro } = useApiContext();
  const [pay, setPay] = useState(true)
    

  const mandalaContainerClassName = `mandala-container pool-${dataCuadro.poolId}`;

  

  return (
  <div> 
   
  <div id="dashboard" className={mandalaContainerClassName}>
  <Mandala/>
  </div>
  
  </div>
       
);
};

export default Dashboard;

