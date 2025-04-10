import dayjs from 'dayjs';
import { UserWithRangeType } from '../../../../types';
import { IRange } from '../../../../utils';

export const getRangesArray = (
  user: UserWithRangeType,
  currentDate: string,
  tdWidth: number | null
): IRange[] => {
  const currentMonth = dayjs(currentDate);

  const daysInMonth = currentMonth.daysInMonth();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const currentDay = currentMonth.date(day);

    const relevantEvent = user.events.find((event) => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);
      return currentDay.isBetween(startDate, endDate, 'day', '[]');
    });

    if (!relevantEvent) return { isStart: false };

    const startDate = dayjs(relevantEvent.startDate);
    const endDate = dayjs(relevantEvent.endDate);

    const isStart =
      startDate.isSame(currentDay, 'day') || currentDay.date() === 1;
    if (!isStart) return { isStart: false };

    const rangeEnd = endDate.isAfter(currentMonth.endOf('month'))
      ? currentMonth.endOf('month').add(-1, 'day')
      : endDate;

    const count = Math.ceil(rangeEnd.diff(currentDay, 'day', true));
    
    return {
      isStart: true,
      width: tdWidth! * count,
      isAllMonth:
        startDate.isBefore(currentMonth.startOf('month')) &&
        endDate.isAfter(currentMonth.endOf('month')),
      isStartPrevMonth: startDate.isBefore(currentMonth.startOf('month')),
      isEndNextMonth: endDate.isAfter(currentMonth.endOf('month')),
      ...relevantEvent,
    };
  });
};
