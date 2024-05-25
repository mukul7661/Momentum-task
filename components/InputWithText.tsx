import React, { useEffect, useState } from "react";

interface InputWithTextProps {
  text: string;
  isDisabled: boolean;
  initialValue: string;
  onChange: (value: string) => void;
}

const InputWithText = ({
  text,
  isDisabled,
  initialValue,
  onChange,
  ...rest
}: InputWithTextProps) => {
  const [value, setValue] = useState(initialValue);
  console.log(initialValue, "wfw");
  const inputStyle = {
    padding: "10px",
    border: `1px solid ${isDisabled ? "#999" : "#FFAD62"}`,
    borderRadius: "4px",
    backgroundColor: "#363636",
    height: "40px",
    width: "300px",
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div style={{ position: "relative", marginTop: "20px" }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isDisabled}
        style={inputStyle}
        {...rest}
      />
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "10px",
          backgroundColor: "#363636",
          padding: "0 5px",
          color: "#999",
          zIndex: "9",
          fontSize: "14px",
          width: "full",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default InputWithText;
