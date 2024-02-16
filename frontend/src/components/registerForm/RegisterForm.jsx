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
import { useApiContext } from "../../../context/apiContext";

const RegisterForm = () => {

  const { dataUser, traerCuadroPadre} = useApiContext();

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
                })   })
          } 
            
          const json = await res.json()

            if (dataUser.referidos.length === 2) {
              console.log("ya esta lleno y listo para probar")
            }
        
      
            switch(res.status){
                case 200: 
                    MySweetAlert.close()
                    router.push(`/login`)
                    break
                case 409:
                    console.log("ya registrado",json)
                    MySweetAlert.fire(
                        'Error',
                        'Email o usuario ya registrado',
                        'error'
                      )
                    break
                case 413:
                  console.log("activar1er user",json)
                  MySweetAlert.fire(
                      'Error',
                      'Falta activar el primer referido',
                      'error'
                    )
                    break
                case 412:
                    console.log("no podes mas",json)
                    MySweetAlert.fire(
                        'Error',
                        'No podes referir mas personas',
                        'error'
                        )
                        break
                default:
                    console.log("llego el default")
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

const termsAndConditions = () => {
  MySweetAlert.fire({
    title: "<strong>Terminos y condiciones</strong>",
  icon: "info",
  html: ` 
  TodosUno es una comunidad creada con el fin del beneficio colectivo, desarrollando un sistema de ayuda mutua.
  Bajo ningún punto de vista garantizamos o aseguramos algún tipo de resultado económico, esto depende 100% del trabajo de cada participante, con esto mismo desvinculo de cualquier reclamo tanto a la persona que me invito como a la propia comunidad.
  Soy consciente y estoy de acuerdo con hacer un regalo voluntario para simplemente aplicar la Ley universal de “Dar y Recibir”. 
  `,
  showCloseButton: true,
  focusConfirm: false,
  confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> OK
  `
});
}


  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} action="#" className="form_register">
        {
          username ?
          <p>
          Referido por: <span className="form__span">{username} </span>
            </p>
            : <></>
        }
        <div className='inputs_register'>
        <div className="form__group_register">
          <label for="nombre">Nombre y Apellido:</label>
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
        <div className="form__group_register">
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
        <div className="form__group_register">
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
        <div className="form__group_register">
          <label for="confirmarEmail">Confirmar correo electrónico:</label>
          <input
            type="email"
            id="confirmarEmail"
            name="confirmarEmail"
            required
            placeholder="Confirme Correo Electrónico"
          />
        </div>
        <div className="form__group_register">
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
        <div className="form__group_register">
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

 {/*ACA VA EL CODIGO DE INVITACION*/}
 <div className="form__group_register">
        <label htmlFor="codigoInvitacion">Codigo de Invitación:</label>
        <input
          type="text"
          placeholder="Codigo de invitacion"
          {...register("codigoInvitacion", {
            required: {
              value: true,
              message: "Código de invitación es obligatorio",
            },
            validate: (value) =>
              value === "todosuno2024" ||
              "Código de invitación incorrecto",
          })}
        />
        {errors.codigoInvitacion && (
          <span>{errors.codigoInvitacion.message}</span>
        )}
      </div>

      <div className="form__group_register">
        <label htmlFor="terminosCondiciones">
          Acepta los términos y condiciones:
        </label>
        <div className="tyc">
          <input
            type="checkbox"
            {...register("terminosCondiciones", {
              required: "Debes aceptar los términos y condiciones",
            })}
          />
          <button onClick={termsAndConditions}>Terminos y condiciones</button>
        </div>
        {errors.terminosCondiciones && (
          <span>{errors.terminosCondiciones.message}</span>
        )}
      </div>  
       
       
        </div>     
        <button type="submit" className="register_btn">
            REGISTRARSE
          </button>
        <Link href={"/login"} className="form__register-link">
            ¿Ya se registró?
          </Link> 
      </form>
    </>
  );
};

export default RegisterForm;


/*else {
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
          }*/