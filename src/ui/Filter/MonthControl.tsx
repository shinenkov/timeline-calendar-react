import { useCallback } from "react";
import dayjs from "dayjs";
import { Button } from "../../components/Button";
import { Locale, Theme } from "../../types";
import { defaultColors, defaultTheme } from "../../utils";
import { locale } from "../../locale";
import { FlexBox } from "../../components/FlexBox";
import classNames from "classnames";
import styles from "./filter.module.css";
import globalStyles from "../../timeline.module.css";
import Next from "../../icons/nextIcon";
import Prev from "../../icons/prevIcon";

type MonthControlProps = {
  currentDate: string;
  onDateChange: (newDate: string) => void;
  theme?: Theme;
  accentColor: string;
  lang: Locale;
};

function MonthControl({
  currentDate,
  onDateChange,
  theme = defaultTheme,
  accentColor,
  lang,
}: MonthControlProps) {
  const setCurrentMonth = useCallback(() => {
    onDateChange(dayjs().toString());
  }, [onDateChange]);

  const changeCurrentMonth = (direction: boolean) => {
    const newDate = dayjs(currentDate)
      .add(direction ? 1 : -1, "month")
      .toString();
    onDateChange(newDate);
  };

  return (
    <FlexBox type="flex" padding={1} className={styles.monthContainer}>
      <FlexBox type="flex" className={styles.currentMonthContainer}>
        <Button
          theme={theme}
          className={styles.currentMonthButton}
          accentColor={accentColor}
          onClick={setCurrentMonth}
        >
          {locale[lang].currentMonth}
        </Button>
      </FlexBox>
      <FlexBox type="flex" className={styles.navigationContainer}>
        <Button
          theme={theme}
          onClick={() => changeCurrentMonth(false)}
          accentColor={accentColor}
          className={styles.prevButton}
        >
          <Prev
            fill={defaultColors[theme].bgSecondary}
            width={"12px"}
            height={"11px"}
            theme={theme}
          />
        </Button>
        <div className={styles.separator} />
        <Button
          theme={theme}
          onClick={() => changeCurrentMonth(true)}
          accentColor={accentColor}
          className={styles.nextButton}
          dataTestid="next-button"
        >
          <Next
            fill={defaultColors[theme].bgSecondary}
            width={"12px"}
            height={"11px"}
            theme={theme}
          />
        </Button>
      </FlexBox>
      <FlexBox type="flex" className={styles.dateContainer}>
        <div className={classNames(globalStyles.text, globalStyles.bodyTitle)}>
          {dayjs(currentDate).locale(lang).format("MMMM YYYY")}
        </div>
      </FlexBox>
    </FlexBox>
  );
}

export default MonthControl;
