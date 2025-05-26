import { useCallback } from "react";
import dayjs from "dayjs";
import Button from "shared/ui/Button";
import { Locale, Theme } from "shared/model";
import { defaultColors, defaultTheme } from "shared/lib";
import { locale } from "shared/lib";
import FlexBox from "shared/ui/FlexBox";
import classNames from "classnames";
import globalStyles from "app/styles/timeline.module.css";
import { NextIcon, PrevIcon } from "shared/ui";
import styles from "./styles.module.css";

type MonthControlProps = {
  currentDate: string;
  onDateChange: (newDate: string) => void;
  theme?: Theme;
  accentColor: string;
  lang: Locale;
};

export function MonthControl({
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
          <PrevIcon
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
          <NextIcon
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
