import React from "react";
import "./loading-spinner.scss";

export default function LoadingSpinner(props) {
  return (
  <div className="overlay">
    <div className="spinner-styles">
      <div className="lds-dual-ring"></div>
      <h2>{props.text}</h2>
    </div>
  </div>
  );
}