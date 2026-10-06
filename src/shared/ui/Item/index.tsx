import { Theme } from "shared/model";
import { defaultColors } from "shared/lib";
import styles from "app/styles/timeline.module.css";
import classNames from "classnames";

type ItemProps = {
  theme: Theme;
  sx?: React.CSSProperties;
  className?: string;
  dataTestid?: string;
  children?: React.ReactNode;
};
const Item = (props: ItemProps) => {
  const { theme, sx, children, className, dataTestid } = props;
  return (
    <div
      className={classNames("timeline-item", styles.item, className)}
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

export default Item;
