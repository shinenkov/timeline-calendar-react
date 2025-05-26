import FlexBox from "shared/ui/FlexBox";
import { Theme } from "shared/model";
import { defaultTheme } from "shared/lib";
import { Item } from "shared/ui";

import styles from "../styles.module.css";

type EmptyDayOfMonthProps = {
  xsSize: number;
  theme?: Theme;
  cellSize?: string;
};

const EmptyDay = (props: EmptyDayOfMonthProps) => {
  const { xsSize, theme = defaultTheme, cellSize } = props;

  const maxWidth = (100 * xsSize) / 12;
  const containerStyle = {
    "--cell-width": cellSize,
    "--max-width": `${maxWidth}%`,
  } as React.CSSProperties;

  return (
    <FlexBox
      size={xsSize}
      className={styles.flexContainer}
      style={containerStyle}
      pxSize={cellSize}
      dataTestid="day-container"
    >
      <Item theme={theme} className={styles.dayContainer} />
    </FlexBox>
  );
};

export default EmptyDay;
