import dayjs from "dayjs";
import Item from "shared/ui/Item";
import FlexBox from "shared/ui/FlexBox";
import { getDaysArray } from "shared/lib";
import { useCalendarConfig, useCalendarUI } from "shared/context";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

function HeadContent() {
  const { theme, cellSize, lang } = useCalendarConfig();
  const { currentDate, thRef } = useCalendarUI();

  return (
    <FlexBox
      ref={thRef}
      type="flex"
      className={classNames("timeline-content-head", styles.headContent)}
    >
      {/* Output of month numbers with days of the week */}
      {getDaysArray(currentDate, lang).map((day, i) => (
        <FlexBox
          key={i}
          pxSize={cellSize}
          size={12 / dayjs(currentDate).daysInMonth()}
        >
          <Item theme={theme}>
            <div className={classNames(styles.text, styles.bodyText)}>
              {i + 1}
            </div>
            <div className={classNames(styles.text, styles.caption)}>{day}</div>
          </Item>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

export default HeadContent;
