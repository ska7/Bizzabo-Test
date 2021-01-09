// API KEY b2f9b657-d8fd-4c34-a28b-eba13cab25c2

import React, { useState } from "react";
import "./App.scss";
import { EventsCalendar } from "./components/EventsCalendar";
import { Input } from "./components/Input";
import axios from "axios";

const App = () => {
  const [apiKey, setApiKey] = useState("");
  const [events, setEvents] = useState([]);

  const validateKey = (apiKey, inputRef) => {
    if (!apiKey) {
      inputRef.current.focus();
      return;
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.bizzabo.com/api/events";
    setApiKey(apiKey);
    axios
      .get(proxyurl + url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        setEvents(res.data.content);
        console.log(res.data.content);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      {apiKey ? (
        <EventsCalendar events={events} />
      ) : (
        <Input validateKey={validateKey} />
      )}
    </div>
  );
};

export default App;
