import React, { useState } from "react";
import "./styles.scss";
import { TInputs } from "..";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const textFormats: { [key: string]: RegExp } = {
  number: /\D/g,
  alphabets: /[^a-zA-Z\s]/g,
  alphabetsWithoutSpace: /[^a-zA-Z]/g,
};

type textInputProps = Omit<React.ComponentProps<"input">, "onChange"> &
  TInputs & {
    type?: "text" | "password" | "number";
    format?: "alphabets" | "number" | "currency" | "alphabetsWithoutSpace";
  };

function TextInput({
  label = "",
  name = "",
  error,
  placeholder,
  type,
  isRequired,
  value,
  format,
  onChange = () => null,
  ...rest
}: textInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (format) {
      if (format === "currency") {
        value = value.replace(textFormats.number, "");
        value = value ? parseFloat(value).toLocaleString() : "";
        onChange(name, value);
      } else {
        onChange(name, value.replace(textFormats[format], ""));
      }
    } else {
      onChange(name, value);
    }
  }

  return (
    <div className="input-container text-input">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>

      <div
        className={`text-input__container ${
          type === "password" ? "text-input__password-container" : ""
        }`}
      >
        <input
          placeholder={placeholder ? placeholder : "Enter your " + label?.toLowerCase()}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleChange}
          {...rest}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <VscEyeClosed className="eye-icon" onClick={() => setShowPassword(false)} />
            ) : (
              <VscEye className="eye-icon" onClick={() => setShowPassword(true)} />
            )}
          </>
        )}
      </div>

      <small>{error}</small>
    </div>
  );
}

export default TextInput;
