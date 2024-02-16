"use client"
import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import Dashboard from "../../components/dashboard/Dashboard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import { useApiContext } from "../../../context/apiContext";
import Cookies from "js-cookie";
import Loader from "../../components/loader/loader"

const Page = () => {

  const { loading} = useApiContext(); // Obtén el estado de carga desde el contexto

  return (
    <div className={`dashboardPage ${loading ? "loading" : ""}`}>
    {loading ? (
      <Loader/>
    ) : (
      <>
        <Header />
        <div className="content">
          <SideBar />
          <div className="dashboardPage__main-content">
            <Dashboard />
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default Page;