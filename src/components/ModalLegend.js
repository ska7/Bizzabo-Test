import React from "react";
import whatIcon from "../img/what-icon.png";
import whenIcon from "../img/clock-icon.png";
import whereIcon from "../img/location-icon.png";

export const ModalLegend = ({ dayClicked }) => {
  return (
    <div className="modal-wrapper">
      <div className="date">
        <p>{dayClicked}</p>
      </div>
      <div className="what">
        <img src={whatIcon} alt="" />
        <p>Event Name</p>
      </div>
      <div className="when">
        <img src={whenIcon} alt="" />
        <p>When</p>
      </div>
      <div className="where">
        <img src={whereIcon} alt="" />
        <p>Where</p>
      </div>
    </div>
  );
};
