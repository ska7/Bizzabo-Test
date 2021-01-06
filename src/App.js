import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const App = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.bizzabo.com/api/events";
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([
    { startDate: "2021-01-06T18:00:00.000+0000" },
    { startDate: "2020-03-09T17:00:00.000+0000" },
  ]);
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
        locale="en-US"
        tileContent={({ activeStartDate, date, view }) => {
          // We need date formatted as yyyy-mm-dd
          const year = date.getFullYear();
          const month =
            date.getMonth().toString().length === 1
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1;
          const day =
            date.getDate().toString().length === 1
              ? `0${date.getDate()}`
              : date.getDate();
          const calendarDate = `${year}-${month}-${day}`;
          console.log("DATE FORMATTED", calendarDate);
          events.forEach((event) => {
            const eventDate = event.startDate.split("T")[0];
            // console.log("DATE EVENT", eventDate);
            if (calendarDate === eventDate) {
              console.log("SUCCESS");
              return <p style={{ fontSize: "15px" }}>YOU'VE GOT AN EVENT</p>;
            }
          });
          // if (date.getDate() === 5) {
          //   return <p style={{ fontSize: "15px" }}>ITS YOUR DAY FUCKER</p>;
          // } else if (date.getDate() === 6) {
          //   return <p style={{ fontSize: "15px" }}>ITS NOT YOUR DAY</p>;
          // }
        }}
      />
    </div>
  );
};

export default App;

// events.forEach((event) => {
//   // We need date formatted as yyyy-mm-dd
//   const eventDate = event.startDate.split("T")[0];
//   const year = date.getFullYear();
//   const month =
//     date.getMonth().toString().length === 1
//       ? `0${date.getMonth() + 1}`
//       : date.getMonth() + 1;
//   const day =
//     date.getDate().toString().length === 1
//       ? `0${date.getDate()}`
//       : date.getDate();
//   const calendarDate = `${year}-${month}-${day}`;
//   console.log("DATE FORMATTED", calendarDate);
//   // console.log("DATE EVENT", eventDate);
//   if (calendarDate === eventDate) {
//     console.log("SUCCESS");
//     return <p style={{ fontSize: "15px" }}>YOU'VE GOT AN EVENT</p>;
//   }
// });
