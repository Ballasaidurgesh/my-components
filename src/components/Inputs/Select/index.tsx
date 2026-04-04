import * as MUI from "@mui/material";
import { RiArrowDownSLine } from "react-icons/ri";
import { useMemo } from "react";

type TValue = string | number;

type props = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  options: { label: string; value: string | number }[];
  name: string;
  value: TValue | { [key: string]: TValue };
  error?: string | { [key: string]: string };
  onChange?: (name: string, value: TValue) => void;
  disabled?: boolean;
  size?: "small" | "medium";
};

function Select({
  label,
  isRequired = false,
  placeholder,
  options = [],
  name,
  value,
  error,
  disabled = false,
  onChange = () => null,
  size = "medium",
}: props) {
  const inputValue = typeof value === "object" ? value?.[name] : value;
  const inputError = typeof error === "object" ? error?.[name] : error;

  const CustomSelect = useMemo(() => {
    return MUI.styled(MUI.Select)({
      border: "var(--input-border)",
      borderRadius: "var(--input-border-radius)",
      backgroundColor: "#fff",

      fieldset: {
        border: "none",
      },

      ".MuiInputBase-input": {
        padding: size === "small" ? "5px 10px" : "6.5px 10px",
        fontSize: "var(--input-font-size)",
        fontFamily: "var(--input-font-family)",
      },

      ".MuiSelect-icon": {
        top: "20%",
      },
    });
  }, [size]);

  return (
    <div className="input-container">
      {label && (
        <label>
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <CustomSelect
        fullWidth
        IconComponent={(props) => <RiArrowDownSLine color="#00000080" size={22} {...props} />}
        MenuProps={{ PaperProps: { sx: dropdownStyles } }}
        value={!inputValue ? "placeholder" : inputValue}
        disabled={disabled}
        onChange={(e) => onChange(name, e.target.value as string)}
      >
        <MUI.MenuItem value="placeholder" sx={{ display: "none" }}>
          <span style={{ color: "var(--color-input-placeholder)", fontWeight: 300 }}>
            {placeholder ? placeholder : "Select an option"}
          </span>
        </MUI.MenuItem>

        {options.map((option, index) => (
          <MUI.MenuItem key={index} value={option?.value} disableRipple style={menuItemStyles}>
            {option?.label}
          </MUI.MenuItem>
        ))}
      </CustomSelect>

      <div className="input-error">
        {inputError === "required" ? `${label} is required` : inputError}
      </div>
    </div>
  );
}

export default Select;

const dropdownStyles = {
  marginTop: 0.5,
  border: "1px solid var(--color-input-border)",
  boxShadow: "none",
  padding: "0 5px",
  borderRadius: "var(--input-border-radius)",
  // maxHeight: 300,
};

const menuItemStyles = {
  fontFamily: "var(--input-font-family)",
  fontSize: "var(--input-font-size)",
  borderRadius: 5,
};
