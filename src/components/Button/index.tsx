import "./styles.scss";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

type buttonProps = Omit<React.ComponentProps<"button">, "style"> & {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  color?: string;
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
  size = "md",
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

  const customColors = {
    primary: color,
    secondary: color ? color + 15 : "",
    outline: "",
  };

  const onHoverColors = {
    primary: color ? `color-mix(in oklab, ${color}, #000 12%)` : "",
    secondary: color ? color + 15 : "",
    outline: color ? color + 10 : "",
  };

  const styles = {
    backgroundColor: isHovered ? onHoverColors[variant] : customColors[variant],
    borderColor: variant === "outline" ? color : "",
    color:
      variant !== "primary"
        ? variant === "secondary" && isHovered
          ? `color-mix(in oklab, ${color}, #000 40%)`
          : color
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
          color: variant !== "primary" ? (color ? color : "var(--color-primary)") : "#fff",
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
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const loaderSize = {
  sm: 18,
  md: 20,
  lg: 22,
};
