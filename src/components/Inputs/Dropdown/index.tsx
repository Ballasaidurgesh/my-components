import { MenuItem, Select, styled } from "@mui/material";
import { RiArrowDownSLine } from "react-icons/ri";
import { useMemo } from "react";

type props = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  options: { label: string; value: string }[];
  name: string;
  value: string | { [key: string]: any };
  error?: string | { [key: string]: string };
  onChange?: (name: string, value: string) => void;
  disabled?: boolean;
  size?: "small" | "medium";
};

function Dropdown({
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
  const inputValue = typeof value === "string" ? value : value?.[name] || "";
  const inputError = typeof error === "string" ? error : error?.[name] || "";

  const CustomSelect = useMemo(() => {
    return styled(Select)({
      border: "var(--input-border)",
      borderRadius: "var(--input-border-radius)",
      backgroundColor: "#fff",

      fieldset: {
        border: "none",
      },

      ".MuiInputBase-input": {
        padding: size === "small" ? "7px 10px" : "9px 10px",
        fontSize: "var(--input-font-size)",
        fontFamily: "var(--input-font-family)",
      },

      ".MuiSelect-icon": {
        top: "25%",
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
        IconComponent={(props) => <RiArrowDownSLine color="#00000050" size={22} {...props} />}
        MenuProps={{ PaperProps: { sx: dropdownStyles } }}
        value={!inputValue ? "placeholder" : inputValue}
        disabled={disabled}
        onChange={(e) => onChange(name, e.target.value as string)}
      >
        <MenuItem value="placeholder" sx={{ display: "none" }}>
          <span style={{ color: "var(--color-input-placeholder)" }}>
            {placeholder ? placeholder : "Select an option"}
          </span>
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem key={index} value={option?.value} disableRipple style={menuItemStyles}>
            {option?.label}
          </MenuItem>
        ))}
      </CustomSelect>

      <div className="input-error">
        {inputError === "required" ? `${label} is required` : inputError}
      </div>
    </div>
  );
}

export default Dropdown;

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
