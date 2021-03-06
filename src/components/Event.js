import React from "react";
import noImage from "../img/photo_not_available.png";

export const Event = ({ eventImage, eventName, eventTime, eventLocation }) => {
  return (
    <div className="event">
      <div className="event-image">
        <img src={eventImage ? eventImage : noImage} alt="" />
      </div>
      <div className="event-name">
        <p>{eventName}</p>
      </div>
      <div className="event-time">
        <p>{eventTime}</p>
      </div>
      <div className="event-location">
        <p>{eventLocation}</p>
      </div>
    </div>
  );
};
