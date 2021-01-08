import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal } from "./components/Modal";

const App = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.bizzabo.com/api/events";
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [modal, showModal] = useState({ isOpen: false, dayClicked: "" });
  const hideModal = () => showModal({ ...modal, isOpen: false });
  useEffect(() => {}, []);

  const handleClick = () => {
    axios
      .get(proxyurl + url, {
        headers: {
          Authorization: `Bearer b2f9b657-d8fd-4c34-a28b-eba13cab25c2`,
        },
      })
      .then((res) => {
        setEvents(res.data.content);
        console.log(res.data.content);
      })
      .catch((e) => console.log(e));
  };

  const getTileContent = (events, date) => {
    // We need date formatted as yyyy-mm-dd
    const calendarDate = date.toISOString().split("T")[0];
    // console.log("DATE FORMATTED", calendarDate);
    for (let event of events) {
      const eventDate = event.startDate.split("T")[0];
      if (calendarDate === eventDate) {
        return (
          <div className="event-tile-style">
            <p className="event-tile-text">YOU'VE GOT AN EVENT</p>
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
    <div className="App">
      <button onClick={handleClick}>PULL DATA</button>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
        tileContent={({ activeStartDate, date, view }) => {
          return getTileContent(events, date);
        }}
        onClickDay={(value, event) => {
          // for the date to always be correct, we should add 1 day to it
          const addDays = (date, days) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result.toISOString().split("T")[0];
          };

          const dayClicked = addDays(value, 1);

          // Loop through all the events and store the ones due the date clicked in state

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
    </div>
  );
};

export default App;
