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
      <h1>b2f9b657-d8fd-4c34-a28b-eba13cab25c2</h1>
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
