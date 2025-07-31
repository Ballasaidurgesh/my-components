import "./styles.scss";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

type buttonProps = Omit<React.ComponentProps<"button">, "style"> & {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline";
  color?: "primary" | "secondary" | "error" | "success" | string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  width?: number;
};

type TDimensions = {
  width: number | undefined;
  height: number | undefined;
};

function Button({
  children,
  className = "",
  variant = "primary",
  size = "medium",
  isLoading = false,
  color = "",
  fullWidth = false,
  style,
  width,
  ...rest
}: buttonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const [isHovered, setHovered] = useState(false);
  const [dimensions, setDimensions] = useState<TDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight,
      });
    }
  }, [ref.current]);

  const selectColor = color in colors ? colors[color] : color;

  const customColors = {
    primary: selectColor,
    secondary: selectColor ? selectColor + 15 : "",
    outline: "",
  };

  const onHoverColors = {
    primary: selectColor ? `color-mix(in oklab, ${selectColor}, #000 15%)` : "",
    secondary: selectColor ? selectColor + 15 : "",
    outline: selectColor ? selectColor + 10 : "",
  };

  const styles = {
    backgroundColor: isHovered ? onHoverColors[variant] : customColors[variant],
    borderColor: variant === "outline" ? selectColor : "",
    color:
      variant !== "primary"
        ? variant === "secondary" && isHovered
          ? `color-mix(in oklab, ${selectColor}, #000 40%)`
          : selectColor
        : "auto",
    ...style,
  };

  return !isLoading ? (
    <button
      ref={ref}
      className={`btn ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ ...styles, width: fullWidth ? "100%" : width ? width : "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </button>
  ) : (
    <button
      style={{
        ...styles,
        width: dimensions.width || "",
        height: dimensions.height || "",
      }}
      className={`btn btn-loader ${variants[variant]} ${className}`}
      disabled
    >
      <CircularProgress
        size={loaderSize[size]}
        style={{
          color: variant !== "primary" ? (selectColor ? selectColor : "#00000080") : "#fff",
        }}
        thickness={7}
      />
    </button>
  );
}

export default Button;

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

const sizes = {
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
};

const loaderSize = {
  small: 18,
  medium: 20,
  large: 22,
};

const colors: Record<string, string> = {
  primary: "#3f51b5",
  secondary: "#6e8295",
  error: "#E7000B",
  success: "#257180",
};
