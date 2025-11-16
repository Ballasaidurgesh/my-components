import "./styles.scss";
export { default as TextInput } from "./TextInput";
export { default as Textarea } from "./Textarea";
export { default as RadioGroup } from "./RadioGroup";
export { default as CheckBoxGroup } from "./CheckboxGroup";
export { default as Dropdown } from "./Dropdown";
export { default as DateSelect } from "./DateSelect";
export { default as OtpInput } from "./OtpInput";
export { default as PhoneInput } from "./PhoneInput";

export type TInputs = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  error?: string;
  onChange?: (name: string, value: string) => void;
};
