import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TInputs } from "..";

type phoneInputProps = TInputs & {
  disableDropdown?: boolean;
  disabled?: boolean;
};

function PhoneInput({
  isRequired,
  label,
  name,
  value,
  error,
  onChange = () => null,
  disableDropdown = false,
  disabled = false,
}: phoneInputProps) {
  return (
    <div className="input-container">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <ReactPhoneInput
        country="in"
        value={value}
        onChange={(value) => onChange(name, value)}
        countryCodeEditable={false}
        disableDropdown={disableDropdown}
        disabled={disabled}
        inputStyle={{
          width: "100%",
          border: 0,
          height: 48,
          borderRadius: "var(--input-border-radius)",
        }}
        containerStyle={{
          border: "var(--input-border)",
          borderRadius: "var(--input-border-radius)",
        }}
        buttonStyle={{
          border: 0,
          backgroundColor: "transparent",
          borderRight: "var(--input-border)",
        }}
      />
      <small>{error}</small>
    </div>
  );
}

export default PhoneInput;
