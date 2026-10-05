import FlexBox from "shared/ui/FlexBox";
import Item from "shared/ui/Item";
import { useCalendarConfig } from "shared/context";
import styles from "../styles.module.css";

type EmptyDayOfMonthProps = {
  xsSize: number;
};

const EmptyDay = ({ xsSize }: EmptyDayOfMonthProps) => {
  const { theme, cellSize } = useCalendarConfig();

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
