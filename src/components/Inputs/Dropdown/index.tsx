import { MenuItem, Select, styled } from "@mui/material";
import { RiArrowDownSLine } from "react-icons/ri";
import { TInputs } from "..";

type props = TInputs & {
  options: { label: string; value: string | number }[];
  disabled?: boolean;
};

function Dropdown({
  label,
  isRequired = false,
  options = [],
  name,
  value,
  error,
  placeholder,
  disabled = false,
  onChange = () => null,
}: props) {
  function handleChange(data: unknown) {
    if (typeof data === "string") {
      onChange(name, data);
    }
  }

  return (
    <div className="input-container">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <CustomSelect
        fullWidth
        IconComponent={(props) => <RiArrowDownSLine size={25} {...props} />}
        MenuProps={{
          PaperProps: {
            sx: dropdownStyles,
          },
        }}
        value={!value ? "placeholder" : value}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value="placeholder" sx={{ display: "none" }}>
          <span style={{ color: "var(--color-input-placeholder)" }}>
            {placeholder ? placeholder : "Select an option"}
          </span>
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option?.value}
            disableRipple
            style={{ fontSize: "var(--input-font-size)" }}
          >
            {option?.label}
          </MenuItem>
        ))}
      </CustomSelect>
      <small>{error}</small>
    </div>
  );
}

export default Dropdown;

const CustomSelect = styled(Select)({
  border: "var(--input-border)",
  borderRadius: "var(--input-border-radius)",
  backgroundColor: "#fff",

  fieldset: {
    border: "none",
  },

  ".MuiInputBase-input": {
    padding: "14px 10px",
    fontSize: "var(--input-font-size)",
    fontFamily: "var(--input-font-family)",
  },

  ".MuiSelect-icon": {
    top: "25%",
  },
});

const dropdownStyles = {
  marginTop: 1,
  border: "1px solid var(--color-input-border)",
  boxShadow: "none",
};
