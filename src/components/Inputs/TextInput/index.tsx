import "./styles.scss";
import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const textFormats = {
  digits: /\D/g,
  letters: /[^a-zA-Z\s]/g,
  lettersDigits: /[^a-zA-Z0-9\s]/g,
  lettersNoSpace: /[^a-zA-Z]/g,
} as const;

type omitProps = "onChange" | "value" | "type";

type textInputProps = Omit<React.ComponentProps<"input">, omitProps> & {
  label?: string;
  isRequired?: boolean;
  name: string;
  value: string | Record<string, string>;
  onChange?: (name: string, value: string) => void;
  error?: string | Record<string, string>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "text" | "password" | "number";
  textFormat?: "letters" | "digits" | "currency" | "lettersNoSpace" | "lettersDigits";
};

function TextInput({
  label,
  isRequired,
  name,
  value,
  onChange = () => null,
  error,
  placeholder,
  type = "text",
  textFormat,
  rightIcon,
  leftIcon,
  ...rest
}: textInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;

    if (textFormat) {
      if (textFormat === "currency") {
        newValue = newValue.replace(textFormats.digits, "");
        newValue = newValue ? parseFloat(newValue).toLocaleString() : "";
        onChange(name, newValue);
      } else {
        onChange(name, newValue.replace(textFormats[textFormat], ""));
      }
    } else {
      onChange(name, newValue);
    }
  }

  const inputValue = typeof value === "object" ? value?.[name] : value;
  const inputError = typeof error === "object" ? error?.[name] : error;

  return (
    <div className="input-container text-input">
      {label && (
        <label htmlFor={name}>
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <div className={`text-input__container`}>
        {leftIcon && <div className="text-input__custom-icon">{leftIcon}</div>}

        <input
          placeholder={
            placeholder ? placeholder : label ? "Enter your " + label?.toLowerCase() : ""
          }
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleChange}
          {...rest}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <VscEyeClosed
                className="text-input__eye-icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <VscEye className="text-input__eye-icon" onClick={() => setShowPassword(true)} />
            )}
          </>
        )}

        {rightIcon && <div className="text-input__custom-icon">{rightIcon}</div>}
      </div>

      <div className="input-error">
        {inputError === "required" ? `${label ?? "This field"} is required` : inputError}
      </div>
    </div>
  );
}

export default TextInput;
