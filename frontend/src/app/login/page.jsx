import React from "react";
import "./loginPage.css";
import LoginForm from "../../components/loginForm/LoginForm";
import Image from "next/image";
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="loginPage">
      {/* <Image
        alt="logo"
        src={"https://www.coffeebeanswap.com/CoffeeBeans.png"}
        height={120}
        width={120}
      /> */}
      <div className='login_back'><Link href={"/"}>Volver al inicio</Link></div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
