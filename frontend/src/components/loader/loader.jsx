import { useState } from "react";
import RingLoader from "react-spinners/ClipLoader";
import "../../app/dashboard/dashboardPage.css"

function Loader() {


  return (
    <div className="loader">
<p>Cargando datos del usuario</p>
<RingLoader color="#892cd2" size={60} />
    </div>
  );
}

export default Loader;