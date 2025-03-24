import "./styles.scss";
import TextInput from "./TextInput";
import Autocomplete from "./Autocomplete";
import Textarea from "./Textarea";
import RadioGroup from "./RadioGroup";
import CheckBoxGroup from "./CheckboxGroup";
import Dropdown from "./Dropdown";
import DateSelect from "./DateSelect";
import OtpInput from "./OtpInput";
import PhoneInput from "./PhoneInput";

export {
  TextInput,
  Autocomplete,
  Textarea,
  RadioGroup,
  CheckBoxGroup,
  Dropdown,
  DateSelect,
  OtpInput,
  PhoneInput,
};

export type TInputs = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  error?: string;
  onChange?: (name: string, value: string) => void;
};
