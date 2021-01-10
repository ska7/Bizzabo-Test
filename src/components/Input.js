import React, { useState, useRef, useEffect } from "react";

export const Input = ({ validateKey, placeholder }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const handleChange = (e) => setValue(e.target.value);
  const handleKeyDown = (e, value, inputRef) => {
    if (e.key === "Enter") {
      if (!value) return;
      validateKey(value, inputRef);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="input-container">
      {/* <h1>b2f9b657-d8fd-4c34-a28b-eba13cab25c2</h1> */}
      <h1>PASTE YOUR BIZZABO API KEY INTO THE FIELD BELOW</h1>
      <input
        className="api-key-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, value, inputRef)}
        required
        placeholder={placeholder}
      />
      <button
        className="api-key-input-button"
        disabled={!value ? true : false}
        onClick={() => validateKey(value, inputRef)}
      >
        SEE EVENTS
      </button>
    </div>
  );
};
