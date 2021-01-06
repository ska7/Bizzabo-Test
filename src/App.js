import "./App.scss";
import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios
      .get("https://api.bizzabo.com/api/events", {
        headers: {
          Authorization: `Bearer b2f9b657-d8fd-4c34-a28b-eba13cab25c2`,
        },
      })
      .then((res) => console.log(res));
  }, []);
  return <div className="App">HEY</div>;
};

export default App;
