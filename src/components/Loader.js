import React from "react";
import loader from "../img/loader-red.png";

export default function Loader() {
  return (
    <div className="loader">
      <img className="loader-circle" src={loader} alt="loader"></img>
    </div>
  );
}
