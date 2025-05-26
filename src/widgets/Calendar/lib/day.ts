import dayjs from "dayjs";
import { IRange } from "shared/model";
import { UserWithRangeType } from "shared/model";
import { Locale } from "shared/model";
import { locale } from "shared/lib";

export const getRangesArray = (
  user: UserWithRangeType,
  currentDate: string,
  tdWidth: number | null,
): IRange[] => {
  const currentMonth = dayjs(currentDate);

  const daysInMonth = currentMonth.daysInMonth();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const currentDay = currentMonth.date(day);

    const relevantEvent = user.events.find((event) => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);
      return currentDay.isBetween(startDate, endDate, "day", "[]");
    });

    if (!relevantEvent) return { isStart: false };

    const startDate = dayjs(relevantEvent.startDate);
    const endDate = dayjs(relevantEvent.endDate);

    const isStart =
      startDate.isSame(currentDay, "day") || currentDay.date() === 1;
    if (!isStart) return { isStart: false };

    const rangeEnd = endDate.isAfter(currentMonth.endOf("month"))
      ? currentMonth.endOf("month").add(-1, "day")
      : endDate;

    const count = Math.ceil(rangeEnd.diff(currentDay, "day", true)) + 1;

    return {
      isStart: true,
      width: tdWidth! * count,
      isAllMonth:
        startDate.isBefore(currentMonth.startOf("month")) &&
        endDate.isAfter(currentMonth.endOf("month")),
      isStartPrevMonth: startDate.isBefore(currentMonth.startOf("month")),
      isEndNextMonth: endDate.isAfter(currentMonth.endOf("month")),
      ...relevantEvent,
    };
  });
};

export const createDayLabel = (n: number, lang: Locale) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [locale[lang].day1, locale[lang].day2, locale[lang].day3];
  return `${n} ${
    titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]]
  }`;
};
