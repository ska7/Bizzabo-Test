// API KEY b2f9b657-d8fd-4c34-a28b-eba13cab25c2

import React, { useState } from "react";
import "./App.scss";
import { EventsCalendar } from "./components/EventsCalendar";
import { Input } from "./components/Input";
import axios from "axios";
import { Slide } from "@material-ui/core";
import Loader from "./components/Loader";

const App = () => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const validateKey = (apiKey, inputRef) => {
    setLoading(true);
    if (!apiKey) {
      inputRef.current.focus();
      return;
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.bizzabo.com/api/events";
    // setVisible(true);
    setApiKey(apiKey);
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
        console.log(res.data.content);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <Slide
        direction="left"
        in={loading}
        mountOnEnter
        unmountOnExit
        timeout={300}
        // children={Loader}
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
        // children={EventsCalendar}
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
        // children={Input}
      >
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Input validateKey={validateKey} />
        </div>
      </Slide>
    </div>
  );
};

export default App;
