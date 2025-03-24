import { useEffect, useState } from "react";
import "./styles.scss";
import { motion } from "framer-motion";

type TOptions = {
  label: string;
  value: string;
};

type tabProps = {
  children?: React.ReactNode;
  activeTab: string;
  options: TOptions[];
  variant?: "underline" | "chip";
  onChange?: (value: string) => void;
  className?: string;
};

const variants = {
  underline: "tab-underline",
  chip: "tab-chip",
};

function Tabs({
  children,
  options = [],
  activeTab,
  onChange = () => null,
  variant = "underline",
  className = "",
}: tabProps) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);

    return () => {
      setIsMount(false);
    };
  }, []);

  return (
    <div
      className={`tabs-container ${variant === "chip" ? "tab-chips-container" : ""} ${className}`}
    >
      <div
        className={`tabs-container__left-section ${
          variant === "chip" ? "tab-chips-container__left-section" : ""
        }`}
      >
        {options.map((item, index) => (
          <div
            key={index}
            className={`tabs-container__tab  ${variants?.[variant]} ${
              item?.value === activeTab ? "active" : ""
            }`}
            onClick={() => onChange(item?.value)}
          >
            {item?.label}

            {isMount && item?.value === activeTab && (
              <motion.div layoutId="active-tab" className="active-tab"></motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="tabs-container__right-section">{children}</div>
    </div>
  );
}

export default Tabs;
