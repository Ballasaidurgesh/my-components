import "./styles.scss";

type textareaProps = Omit<React.ComponentProps<"textarea">, "onChange" | "value"> & {
  label?: string;
  isRequired?: boolean;
  name: string;
  value: string | Record<string, string>;
  error?: string | Record<string, string>;
  onChange?: (name: string, value: string) => void;
};

const Textarea = ({
  label,
  isRequired,
  placeholder,
  name,
  value,
  error,
  onChange = () => null,
  rows = 5,
  ...rest
}: textareaProps) => {
  const inputValue = typeof value === "object" ? value?.[name] : value;
  const inputError = typeof error === "object" ? error?.[name] : error;

  return (
    <div className="input-container">
      {label && (
        <label>
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={inputValue}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder ?? "Type here..."}
        rows={rows}
        {...rest}
      />

      <div className="input-error">
        {inputError === "required" ? `${label ?? "This field"} is required` : inputError}
      </div>
    </div>
  );
};

export default Textarea;
