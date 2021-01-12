import React, { useState } from "react";
import { Modal } from "./Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const EventsCalendar = ({ events }) => {
  const [value, onChange] = useState(new Date());
  const [dayEvents, setDayEvents] = useState([]);
  const [modal, showModal] = useState({ isOpen: false, dayClicked: "" });
  const hideModal = () => showModal({ ...modal, isOpen: false });

  const formatDate = (dateString) => {
    let stringParts = dateString.split("/");
    // console.log("PARTS", stringParts);
    stringParts = stringParts.map((part) => {
      return part.length < 2 ? "0".concat(part) : part;
    });
    return `${stringParts[2]}-${stringParts[0]}-${stringParts[1]}`;
  };

  const getTileContent = (events, date) => {
    const day = date.getDate();
    // We loop through events pulled out from the account and assign each tile in the calendar its events by matching dates.
    for (let event of events) {
      // We need date formatted as yyyy-mm-dd
      const eventDate = event.startDate.split("T")[0];
      const options = {
        timeZone: event.timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      // We need date to be formatted here the same way too so we can match it
      const calendarDate = formatDate(
        new Intl.DateTimeFormat("en-US", options).format(date)
      );
      if (calendarDate === eventDate) {
        return (
          <div className="event-tile">
            <div className="event-tile-date-number">
              <p>{day}</p>
            </div>
            <p className="event-tile-text">YOU'VE GOT EVENTS</p>
            <img src={event.coverPhotoUrl} alt=""></img>
          </div>
        );
      }
    }
  };

  const getDayEvents = (events, date) => {
    const dueEvents = events.filter((event) => {
      const eventDate = event.startDate.split("T")[0];
      return eventDate === date;
    });
    return dueEvents;
  };
  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
        // activeStartDate,
        tileContent={({ date, view }) => {
          if (view === "month") return getTileContent(events, date);
        }}
        onClickDay={(value) => {
          const dayClicked = formatDate(
            new Intl.DateTimeFormat("en-US").format(value)
          );

          // Loop through all the events and store the ones due date clicked in state
          setDayEvents(getDayEvents(events, dayClicked));
          showModal({
            isOpen: true,
            dayClicked: dayClicked,
          });
        }}
      />
      <Modal
        isOpen={modal.isOpen}
        hideModal={hideModal}
        dayEvents={dayEvents}
        dayClicked={modal.dayClicked}
      />
    </>
  );
};
