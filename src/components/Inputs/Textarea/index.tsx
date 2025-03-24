import "./styles.scss";
import { TInputs } from "..";

type textareaProps = TInputs & {
  rows?: number;
  maxLength?: number;
};

const Textarea = ({
  name,
  label,
  placeholder,
  isRequired,
  error,
  rows = 5,
  onChange = () => null,
  value,
  maxLength,
}: textareaProps) => {
  return (
    <div className="input-container">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>
      <textarea
        placeholder={placeholder ? placeholder : "Type here..."}
        name={name}
        value={value}
        maxLength={maxLength}
        rows={rows}
        onChange={(event) => onChange(name, event.target.value)}
      ></textarea>
      <small>{error}</small>
    </div>
  );
};

export default Textarea;
