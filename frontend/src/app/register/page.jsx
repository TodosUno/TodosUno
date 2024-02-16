import React from "react";
import "./registerPage.css";
import RegisterForm from "../../components/registerForm/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="registerPage">
     {/* <Image
        alt="logo"
        src={"https://www.coffeebeanswap.com/CoffeeBeans.png"}
        height={100}
        width={100}
      /> */}
    
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
