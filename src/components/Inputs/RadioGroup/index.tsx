import { TInputs } from "..";
import "./styles.scss";

type radioGroupProps = TInputs & {
  options: { label: string; value: string }[];
  alignment?: "vertical" | "horizontal";
};

function RadioGroup({
  label,
  isRequired,
  name,
  value,
  error,
  options = [],
  alignment = "vertical",
  onChange = () => null,
}: radioGroupProps) {
  return (
    <div className="input-container radio-group">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>

      <div
        className={`radio-group__options-container`}
        style={{ flexDirection: alignment === "horizontal" ? "row" : "column" }}
      >
        {options?.map((item, index) => (
          <div
            key={index}
            className="radio-group__option"
            onClick={() => onChange(name, item?.value)}
          >
            <input type="radio" checked={value === item?.value} onChange={() => null} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <small>{error}</small>
    </div>
  );
}

export default RadioGroup;
