import "./styles.scss";
import { motion } from "framer-motion";

type switchProps = {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  color?: string;
  onChange?: (value: boolean) => void;
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizes = {
  small: "switch-small",
  medium: "switch-medium",
  large: "switch-large",
};

function Switch({
  label,
  checked = false,
  onChange = () => null,
  disabled = false,
  color = "",
  size = "medium",
  className = "",
}: switchProps) {
  return (
    <div className="switch">
      {label && <label className="switch__label">{label}</label>}
      <div
        className={`switch__button ${sizes[size]} ${checked ? "active" : ""} ${
          disabled ? "disabled" : ""
        } ${className}`}
        style={{ backgroundColor: checked ? color : "" }}
        onClick={() => !disabled && onChange(!checked)}
      >
        <motion.div layout transition={{ duration: 0.2 }} className="circle"></motion.div>
      </div>
    </div>
  );
}

export default Switch;
