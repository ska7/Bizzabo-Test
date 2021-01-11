// API KEY b2f9b657-d8fd-4c34-a28b-eba13cab25c2

import React, { useState } from "react";
import "./App.scss";
import { EventsCalendar } from "./components/EventsCalendar";
import { Input } from "./components/Input";
import axios from "axios";
import { Slide } from "@material-ui/core";
import Loader from "./components/Loader";

const App = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const validateKey = (apiKey, inputRef) => {
    setLoading(true);
    // if input field is empty, put focus to it and return
    if (!apiKey) {
      inputRef.current.focus();
      return;
    }

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.bizzabo.com/api/events";
    try {
      axios
        .get(proxyurl + url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setEvents(res.data.content);
          setShowCalendar(true);
        })
        .catch((e) => {
          // If there's an error, its text message will be displayed as a placeholder within the input field
          setPlaceholder(e.response.statusText);
          setLoading(false);
        });
    } catch (e) {
      setPlaceholder(e.response.statusText);
    }
  };

  return (
    <div className="App">
      <Slide
        direction="left"
        in={loading}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <div>
          <Loader />
        </div>
      </Slide>
      <Slide
        direction="up"
        in={showCalendar}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <div className="wrapper">
          <EventsCalendar events={events} />
        </div>
      </Slide>
      <Slide
        direction="right"
        in={!loading & !showCalendar}
        mountOnEnter={false}
        unmountOnExit
        timeout={300}
      >
        <div className="wrapper">
          <Input validateKey={validateKey} placeholder={placeholder} />
        </div>
      </Slide>
    </div>
  );
};

export default App;
