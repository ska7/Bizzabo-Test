import React, { useState, useRef, useEffect } from "react";

export const Input = ({ validateKey }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="input-container">
      <h1>PASTE YOUR API KEY INTO THE FIELD BELOW</h1>
      <input
        className="api-key-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        required
      />
      <button
        className="api-key-input-button"
        onClick={() => validateKey(value, inputRef)}
      >
        SEE EVENTS
      </button>
    </div>
  );
};
