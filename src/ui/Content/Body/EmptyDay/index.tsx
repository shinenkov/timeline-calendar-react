import { FlexBox } from "../../../../components/FlexBox";
import { Theme } from "../../../../types";
import { defaultTheme } from "../../../../utils";
import { Item } from "../../../../components/Item";

import styles from "../Day/day.module.css";

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
