import { styled } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { TInputs } from "..";

type timeSelectProps = Omit<TInputs, "placeholder"> & {
  disabled?: boolean;
};

function TimeSelect({
  label,
  isRequired,
  name,
  value,
  error,
  onChange = () => null,
  disabled,
}: timeSelectProps) {
  return (
    <div className="input-container">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CustomTimePicker
          value={!value || value === "" ? null : moment(value)}
          onChange={(newValue) => onChange(name, moment(newValue).format("MM/DD/YYYY"))}
          disabled={disabled}
        />
      </LocalizationProvider>
      <small>{error}</small>
    </div>
  );
}

export default TimeSelect;

const CustomTimePicker = styled(TimePicker)({
  width: "100%",
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
});
