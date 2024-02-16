"use client";
import React, { useState } from "react";
import "./loginForm.css";
import Link from "next/link";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useApiContext } from "../../../context/apiContext";
import withReactContent from "sweetalert2-react-content";


const MySweetAlert = withReactContent(Swal);

const LoginForm = () => {
  

  const {setToken, setReset} = useApiContext()
  
   const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const submitHandler = async (data) => {
    MySweetAlert.fire({
      position: "center",
      title: "Login...",
      showConfirmButton: false,
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      switch (res.status) {
        case 200:
  const json = await res.json();
  Cookies.set("token", json.token);
  setToken(json.token);
 // setReset(true); // Asegúrate de que esto esté configurado correctamente
  MySweetAlert.close();
  router.push("/dashboard");
          break;
        case 401:
          console.log("Incorrect email or password");
          MySweetAlert.fire("Error", "Incorrect email or password", "error");
          break;
        default:
          console.log("Server error");
          MySweetAlert.fire("Error", "Server error", "error");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <div className="title">TodosUno</div>
      <form onSubmit={handleSubmit(submitHandler)} className="form_login">
        <div className="form__group_login">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            className="input_login"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Ingrese un Correo Electrónico"
            {...register("email", {
              required: {
                value: true,
                message: "Required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "The format is incorrect",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form__group_login">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            className="input_login"
            type="password"
            id="contrasena"
            name="contrasena"
            required
            placeholder="Ingrese su contraseña"
            {...register("password", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form_bottom_login">
          <Link href={"/contact"} className="form__login-link">
            REGISTRARSE
          </Link>
          <button type="submit" className="form_btn_login">
            INICIAR SESIÓN
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
