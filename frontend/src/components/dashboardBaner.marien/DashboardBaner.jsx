/*"use client";
import React from "react";
import "./dashboardBaner.css";
import { Icon } from "@iconify/react";
import ProgressBar from "react-progressbar";

const DashboardBanner = ({ progressValue, total }) => {
  const completedColor = "#fff";

  return (
    <div className="baner">
      <div className="baner__top">
        <span className="baner__title">GANANCIA</span>{" "}
        <span className="baner__value">{Number(total).toFixed(2) || 0}$</span>
      </div>
      <div className="baner__bottom">
        <div className="baner__content" style={{width:"100%"}}>
          <ProgressBar completed={progressValue} height="2px"  />
          <p className="baner__p">
            PORCENTAJE DE AVANCE{" "}
            <span>{Number(progressValue).toFixed(2)}%</span>
          </p>
        </div>
        <span className="baner__icon-container">
          <Icon icon="fluent:arrow-growth-20-filled" className="baner__icon" />
        </span>
      </div>
    </div>
  );
};
export default DashboardBanner;
*/