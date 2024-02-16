"use client"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react'
import withReactContent from "sweetalert2-react-content";
import "./registerForm.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
const MySweetAlert = withReactContent(Swal);

const RegisterForm = () => {


  const router = useRouter()

    const searchParams = useSearchParams();
  const username = searchParams.get("username");
  console.log(username)


    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onBlur"
    });
    const password = useRef({});
    password.current = watch("password", "");
    const submitHandler = async data => {
        MySweetAlert.fire({
            position: "center",
            title: "Loading...",
            showConfirmButton: false,
        });
      try {
        let res;
          if (username !== undefined) {
                    res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/createUser/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    username: data.username,
                    name: data.name,
                    password: data.password,
                })
             
              }
            )
            console.log("1")
          } else {
           res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    username: data.username,
                    name: data.name,
                    password: data.password,
                })
             
              }
            )
            console.log("2")
          }
            
          const json = await res.json()
          console.log(json)
            switch(res.status){
                case 201: 
                    MySweetAlert.close()
                    router.push(`/login`)
                    break
                case 400:
                    console.log("ya registrado",json)
                    MySweetAlert.fire(
                        'Error',
                        'Email already registered',
                        'error'
                      )
                    break
                default:
                    console.log("error en el server")
                    MySweetAlert.fire(
                        'Error',
                        'Error en el server',
                        'error'
                      )
                    break
            }
        } catch (error) {
            console.log(error)
        }
        
    }



  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} action="#" className="form">
        {
          username ?
          <p>
          Referido por: <span className="form__span">{username} </span>
            </p>
            : <></>
        }
        <div className="form__group">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ingrese un nombre"
            {...register("name", {
              required: {
                value: true,
                message: "Required"
              }
            })}
          />
        </div>
        <div className="form__group">
          <label for="usuario">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Ingrese un nombre de usuario"
             {...register("username", {
              required: {
                value: true,
                message: "Required"
              }
            })}
          />
        </div>
        <div className="form__group">
          <label for="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Ingrese un Correo Electrónico"
            {...register("email", {required:{
                    value: true,
                    message: "Required"
                }, pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "The format is incorrect."
                }})}

          />
          {errors.email && <span>{errors.email.message}</span>}   
        </div>
        <div className="form__group">
          <label for="confirmarEmail">Confirmar correo electrónico:</label>
          <input
            type="email"
            id="confirmarEmail"
            name="confirmarEmail"
            required
            placeholder="Confirme Correo Electrónico"
          />
        </div>
        <div className="form__group">
          <label for="contrasena">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Ingrese su contraseña"
            {...register("password", {required:{
                    value: true,
                    message: "Required"
                }, minLength: {
                    value: 8,
                    message: "The password must have a minimum of 8 characters"
                }, maxLength: {
                    value: 16,
                    message: "The password must have a maximum of 16 characters"
                }})}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form__group">
          <label for="confirmarContrasena">Confirmar contraseña:</label>
          <input
            type="password"
            id="cpsw"
            name="cpsw"
            required
            placeholder="Confirme su contraseña"
            {...register("cpsw", {required:{
                    value: true,
                    message: "Required"
                },validate: value => value === password.current || "The passwords do not match"})}

          />
          {errors.cpsw && <span>{errors.cpsw.message}</span>}
        </div>
        <div className="form__bottom">
          <Link href={"/login"} className="form__login-link">
            <p className="form__p">¿Ya se registró?</p>
          </Link>
          <button type="submit" className="form__btn">
            REGISTRARSE
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
