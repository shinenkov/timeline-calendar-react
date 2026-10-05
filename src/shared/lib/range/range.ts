import dayjs from "dayjs";
import { Locale } from "shared/model";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

// Style of the chips on the month
export const getRangeStyle = (
  startDate: number,
  endDate: number,
  widthChip: number,
  color: string | undefined,
  isAllMonth: boolean,
  isEndNextMonth: boolean,
) => {
  const baseWidht = widthChip;
  const shift = 4;

  let style: React.CSSProperties = {
    border: `0px solid ${color}55`,
    width: `${baseWidht - shift * 2}px`,
    maxWidth: `${baseWidht - shift * 2}px`,
    background: `${color ?? "#f44336"}55`,
    color: color ?? "#f44336",
  };
  if (isEndNextMonth) {
    style = {
      ...style,
      width: `${baseWidht - shift}px`,
      maxWidth: `${baseWidht - shift}px`,
    };
  }
  if (isAllMonth) {
    style = {
      ...style,
      width: `${baseWidht}px`,
      maxWidth: `${baseWidht}px`,
    };
  }
  return style;
};

export const getClassName = (
  isStartPrevMonth: boolean,
  isEndNextMonth: boolean,
) => {
  const className = classNames(
    styles.range,
    isStartPrevMonth && styles.startPrev,
    isEndNextMonth && styles.endNext,
  );
  return className;
};

// Getting days of the month given days of the week
export const getDaysArray = (date: string, lang: Locale): string[] => {
  const daysInMonth = dayjs(date).daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) =>
    dayjs(date).locale(lang).startOf("month").add(i, "day").format("dd"),
  );
};

// Getting a range of numbers between two dates within a month
export const getRange = (start: number, end: number, currentDate: string) => {
  const curEnd = end < start ? dayjs(currentDate).daysInMonth() : end;
  return [...Array(curEnd - start + 1).keys()].map((n) => n + start);
};
