import React, { CSSProperties, JSX } from "react";
import classNames from "classnames";
import styles from "./flexbox.module.css";

type FlexBoxProps = {
  size?: number;
  pxSize?: string;
  padding?: number;
  type?: "flex" | "box";
  direction?: "column" | "row";
  style?: CSSProperties;
  className?: string;
  dataTestid?: string;
  children?: JSX.Element | JSX.Element[];
};

const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const {
    size = 12,
    pxSize,
    padding = 0,
    type = "box",
    children,
    direction = "row",
    className,
    dataTestid,
    style,
  } = props;

  const containerClass = classNames(
    type === "flex" ? styles.flexContainer : styles.flexBox,
    styles[`size${size}`],
    styles[`padding${padding}`],
    styles[direction],
    {
      [styles.customSize]: pxSize,
    },
    className,
  );
  const maxWidth = (100 * size) / 12;
  const customStyle = pxSize
    ? ({
        "--custom-width": pxSize,
        ...style,
      } as CSSProperties)
    : 12 % size !== 0 && size % 2 !== 0
      ? {
          flexBasis: `${maxWidth}%`,
          maxWidth: `${maxWidth}%`,
          minWidth: "auto",
          ...style,
        }
      : style;

  return (
    <div
      data-testid={dataTestid}
      className={containerClass}
      ref={ref}
      style={customStyle}
    >
      {children}
    </div>
  );
});

export default FlexBox;
