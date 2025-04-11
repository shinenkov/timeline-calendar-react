import { Theme } from "../../types";
import { defaultColors } from "../../utils";
import styles from "../../timeline.module.css";

type ItemProps = {
  theme: Theme;
  sx?: React.CSSProperties;
  className?: string;
  dataTestid?: string;
  children?: React.ReactNode;
};
export const Item = (props: ItemProps) => {
  const { theme, sx, children, className, dataTestid } = props;
  return (
    <div
      className={styles.item + (className ? " " + className : "")}
      data-testid={dataTestid}
      style={{
        backgroundColor: defaultColors[theme].bgPrimary,
        color: defaultColors[theme].textPrimary,
        boxShadow: `inset 0.5px 0.5px ${defaultColors[theme].boxShadow}, inset -0.5px -0.5px ${defaultColors[theme].boxShadow}`,
        ...sx,
      }}
    >
      {children}
    </div>
  );
};
