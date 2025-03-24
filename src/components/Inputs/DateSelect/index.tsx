import { styled } from "@mui/material";
import { LocalizationProvider, DatePicker, DateView } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { TInputs } from "..";

type dateSelectProps = Omit<TInputs, "placeholder"> & {
  disabled?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  views?: DateView[];
};

function DateSelect({
  label,
  isRequired,
  name,
  value,
  error,
  minDate,
  maxDate,
  disabled,
  disablePast,
  disableFuture,
  views = ["year", "month", "day"],
  onChange = () => null,
}: dateSelectProps) {
  return (
    <div className="input-container">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CustomDatePicker
          value={!value || value === "" ? null : moment(value)}
          onChange={(newValue) => onChange(name, moment(newValue).format("MM/DD/YYYY"))}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          views={views}
        />
      </LocalizationProvider>
      <small>{error}</small>
    </div>
  );
}

export default DateSelect;

const CustomDatePicker = styled(DatePicker)({
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
