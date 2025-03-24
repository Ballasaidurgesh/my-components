import { useMemo } from "react";
import * as MUI from "@mui/material";
import "./styles.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import { TInputs } from "..";

type props = TInputs & {
  options: { label: string; value: string | number }[];
  disabled?: boolean;
  disableClearable?: boolean;
};

function Autocomplete({
  label = "",
  isRequired = false,
  options = [],
  error,
  name = "",
  value = "",
  placeholder,
  disabled = false,
  disableClearable = false,
  onChange = () => null,
}: props) {
  const inputValue = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [value]);

  function handleChange(data: any) {
    onChange(name, data?.value);
  }

  return (
    <div className="input-container autocomplete-input">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <CustomAutocomplete
        renderInput={(params) => (
          <MUI.TextField {...params} placeholder={placeholder ? placeholder : "Select an option"} />
        )}
        PaperComponent={({ children }) => <CustomPaper>{children}</CustomPaper>}
        popupIcon={<RiArrowDownSLine />}
        fullWidth
        disabled={disabled}
        disableClearable={disableClearable}
        options={options}
        value={inputValue || null}
        onChange={(e, value) => handleChange(value)}
      />
      <small>{error}</small>
    </div>
  );
}

export default Autocomplete;

const CustomAutocomplete = MUI.styled(MUI.Autocomplete)({
  border: "var(--input-border)",
  borderRadius: "var(--input-border-radius)",
  backgroundColor: "#fff",

  fieldset: {
    border: "none",
  },

  ".MuiInputBase-root": {
    padding: "7px 5px",
    fontSize: "var(--input-font-size)",
    fontFamily: "var(--input-font-family)",
  },
});

const CustomPaper = MUI.styled(MUI.Paper)({
  marginTop: 8,
  border: "1px solid var(--color-input-border)",
  fontSize: "var(--input-font-size)",
  fontFamily: "var(--input-font-family)",

  '.MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: "var(--input-selected)",

    "&.Mui-focused": {
      backgroundColor: "var(--color-input-selected)",
    },
  },
});
