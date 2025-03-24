import { TInputs } from "..";
import "./styles.scss";

type checkboxProps = Omit<TInputs, "value" | "onChange"> & {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (name: string, value: string[]) => void;
};

function CheckBoxGroup({
  label,
  isRequired,
  name,
  options = [],
  value = [],
  error,
  onChange = () => null,
}: checkboxProps) {
  function handleChange(item: string) {
    const existingItem = value.includes(item);

    if (existingItem) {
      const newItems = value.filter((value) => value !== item);
      onChange(name, newItems);
    } else {
      onChange(name, [...value, item]);
    }
  }

  return (
    <div className="input-container checkbox-group">
      <label>
        {label} {isRequired && <span>*</span>}
      </label>

      <div className="checkbox-group__options-container">
        {options?.map((item, index) => (
          <div key={index} className="checkbox-group__option">
            <input
              type="checkbox"
              onChange={() => handleChange(item?.value)}
              checked={
                value?.includes(
                  options?.find((option) => option?.value === item?.value)?.value ?? "",
                )
                  ? true
                  : false
              }
            />
            <span>{item?.label}</span>
          </div>
        ))}
      </div>

      {<small>{error}</small>}
    </div>
  );
}

export default CheckBoxGroup;
