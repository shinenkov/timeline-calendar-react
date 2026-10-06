import dayjs from "dayjs";
import { Locale } from "shared/model";
import { defaultColors } from "../colors";

// Style of the chips on the month
export const getRangeStyle = (
  widthChip: number,
  color: string | undefined,
  isAllMonth: boolean,
  isEndNextMonth: boolean,
) => {
  const baseWidth = widthChip;
  const shift = 4;
  const baseColor = color ?? defaultColors.dark.eventColor;

  let style: React.CSSProperties = {
    border: `0px solid ${baseColor}55`,
    width: `${baseWidth - shift * 2}px`,
    maxWidth: `${baseWidth - shift * 2}px`,
    background: `${baseColor}55`,
    color: baseColor,
  };
  if (isEndNextMonth) {
    style = {
      ...style,
      width: `${baseWidth - shift}px`,
      maxWidth: `${baseWidth - shift}px`,
    };
  }
  if (isAllMonth) {
    style = {
      ...style,
      width: `${baseWidth}px`,
      maxWidth: `${baseWidth}px`,
    };
  }
  return style;
};

// Getting days of the month given days of the week
export const getDaysArray = (date: string, lang: Locale): string[] => {
  const start = dayjs(date).locale(lang).startOf("month");
  const daysInMonth = start.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) =>
    start.add(i, "day").format("dd"),
  );
};

// Getting a range of numbers between two dates within a month
export const getRange = (start: number, end: number, currentDate: string) => {
  const curEnd = end < start ? dayjs(currentDate).daysInMonth() : end;
  return [...Array(curEnd - start + 1).keys()].map((n) => n + start);
};
