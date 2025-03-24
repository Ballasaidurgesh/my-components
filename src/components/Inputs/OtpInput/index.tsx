import React, { useRef, useState } from "react";
import "./styles.scss";

type propTypes = {
  length?: number;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

function OtpInput({
  length = 4,
  onChange,
  className = "",
  style = {},
  disabled = false,
}: propTypes) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const ref = useRef<HTMLInputElement[]>(new Array(length).fill(null));

  function handleChange(inputValue: string, index: number) {
    const value = inputValue.replace(/[^0-9]/g, "");

    let newArray = [...otp];
    newArray[index] = value;
    setOtp(newArray);

    if (value.length === 1 && index < length - 1) {
      ref.current[index + 1].focus();
    }

    if (newArray.every((digit) => digit !== "")) {
      onChange(newArray.join(""));
    } else {
      onChange("");
    }
  }

  function handleKeyDown(key: string, index: number) {
    if (key === "Backspace" && !otp[index] && index > 0) {
      ref.current[index - 1].focus();
    }
  }

  return (
    <div className={`input-container otp-input ${className}`} style={style}>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (ref.current[index] = el as HTMLInputElement)}
          className="otp-input__text-input"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          autoFocus={index === 0}
          disabled={disabled}
          onKeyDown={(e) => handleKeyDown(e.key, index)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
