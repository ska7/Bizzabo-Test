import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const App = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.bizzabo.com/api/events";
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  useEffect(() => {}, []);

  const handleClick = () => {
    axios
      .get(proxyurl + url, {
        headers: {
          Authorization: `Bearer b2f9b657-d8fd-4c34-a28b-eba13cab25c2`,
        },
      })
      .then((res) => setEvents(res.data.content))
      .catch((e) => console.log(e));

    const date = new Date();
    // const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    console.log(date.toISOString());
  };

  return (
    <div className="App">
      <button onClick={handleClick}>PULL DATA</button>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={({ activeStartDate, date, view }) => {
          if (date.getDate() === 5) {
            return <p>ITS YOUR DAY FUCKER</p>;
          } else if (date.getDate() === 6) {
            return <p>ITS NOT YOUR DAY</p>;
          }
        }}
      />
    </div>
  );
};

export default App;
