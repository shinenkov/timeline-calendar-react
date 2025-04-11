import { Theme } from "../../types";
import { defaultColors, defaultTheme } from "../../utils";
import classNames from "classnames";
import styles from "./button.module.css";

type ButtonProps = {
  theme: Theme;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "text" | "outlined";
  disabled?: boolean;
  sx?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
  accentColor: string;
  dataTestid?: string;
  children?: React.ReactNode;
};
export const Button = (props: ButtonProps) => {
  const {
    onClick,
    theme = defaultTheme,
    size = "medium",
    variant = "contained",
    children,
    disabled = false,
    className,
    dataTestid,
    accentColor,
    sx,
  } = props;

  const buttonVariant = {
    contained: {
      backgroundColor: accentColor,
      color: defaultColors[theme].bgSecondary,
    },
    text: {
      backgroundColor: "transparent",
      color: accentColor,
    },
    outlined: {
      backgroundColor: "transparent",
      color: accentColor,
      border: `1px solid ${accentColor}`,
    },
  }[variant];

  return (
    <button
      disabled={disabled}
      data-testid={dataTestid}
      onClick={onClick}
      className={classNames(styles.button, styles[size], className)}
      style={{
        ...buttonVariant,
        ...sx,
      }}
    >
      {children}
    </button>
  );
};
