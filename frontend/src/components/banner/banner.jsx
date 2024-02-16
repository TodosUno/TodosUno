import React from 'react'
import "./banner.css"
import Link from "next/link";


const Banner = () => {
  return (
    <div className='banner'>
        <h1 id='logo-banner'>TodosUno</h1>
   <span><Link href={"/login"}>Entrar</Link> / <Link href={"/contact"}>Registrarte</Link></span>
   
    </div>
  )
}

export default Banner