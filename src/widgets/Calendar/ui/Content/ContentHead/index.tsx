import dayjs from "dayjs";
import { defaultTheme } from "shared/lib";
import Item from "shared/ui/Item";
import { Locale, Theme } from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import { getDaysArray } from "shared/lib";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

type HeadContentProps = {
  currentDate: string;
  thRef: React.RefObject<HTMLDivElement | null>;
  theme?: Theme;
  cellSize?: string;
  lang: Locale;
};

function HeadContent(props: HeadContentProps) {
  const { currentDate, thRef, theme = defaultTheme, cellSize, lang } = props;

  return (
    <FlexBox ref={thRef} type="flex" className={styles.headContent}>
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
