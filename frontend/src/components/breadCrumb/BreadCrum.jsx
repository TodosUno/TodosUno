import React from "react";
import "./breadCrumb.css";

const BreadCrum = ({ title }) => {
  return (
    <div className="breadCrum">
      <h4 className="breadCrum__title">{title}</h4>
    </div>
  );
};

export default BreadCrum;
