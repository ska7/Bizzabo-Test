import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Modal } from "./Modal";

export const EventsCalendar = ({ events }) => {
  const [value, onChange] = useState(new Date());

  const [dayEvents, setDayEvents] = useState([]);
  const [modal, showModal] = useState({ isOpen: false, dayClicked: "" });
  const hideModal = () => showModal({ ...modal, isOpen: false });
  useEffect(() => {}, []);

  // const handleClick = () => {
  //   axios
  //     .get(proxyurl + url, {
  //       headers: {
  //         Authorization: `Bearer b2f9b657-d8fd-4c34-a28b-eba13cab25c2`,
  //       },
  //     })
  //     .then((res) => {
  //       setEvents(res.data.content);
  //       console.log(res.data.content);
  //     })
  //     .catch((e) => console.log(e));
  // };

  // We need date formatted as yyyy-mm-dd
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
    for (let event of events) {
      const eventDate = event.startDate.split("T")[0];
      const options = {
        timeZone: event.timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const calendarDate = formatDate(
        new Intl.DateTimeFormat("en-US", options).format(date)
      );
      if (calendarDate === eventDate) {
        return (
          <div className="event-tile-style">
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
      console.log(eventDate, date);
      return eventDate === date;
    });
    return dueEvents;
  };
  return (
    <>
      {/* <button onClick={handleClick}>PULL DATA</button> */}
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
        tileContent={({ activeStartDate, date, view }) => {
          if (view === "month") return getTileContent(events, date);
        }}
        onClickDay={(value, event) => {
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
