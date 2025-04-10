import dayjs from 'dayjs';
import { Locale } from '../../types';
import styles from '../../timeline.module.css';
import classNames from 'classnames';

export const getInitials = (name: string): string => {
  if (!name) return '';

  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 0) return '';
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

  return (nameParts[nameParts.length - 1][0] + nameParts[0][0]).toUpperCase();
};

// Style of the chips on the month
export const getRangeStyle = (
  startDate: number,
  endDate: number,
  widthChip: number,
  color: string | undefined,
  isAllMonth: boolean,
  isEndNextMonth: boolean,
  cellSize?: string
) => {
  const basePx = 12;
  let style: React.CSSProperties = {
    border: `0px solid ${color}55`,
    justifyContent:
      startDate === endDate || widthChip <= 64 ? 'space-between' : 'flex-start',
    width: `${widthChip + ((cellSize !== undefined) ? basePx - 8 : basePx - 4)}px`,
    maxWidth: `${widthChip + ((cellSize !== undefined) ? basePx - 8 : basePx - 4)}px`,
    background: `${color ?? '#f44336'}55`,
    color: color ?? '#f44336',
  };
  if (isEndNextMonth) {
    style = {
      ...style,
      width: `${widthChip + ((cellSize !== undefined) ? basePx - 4 : basePx * 2)}px`,
      maxWidth: `${widthChip + ((cellSize !== undefined) ? basePx - 4 : basePx * 2)}px`,
    };
  }
  if (isAllMonth) {
    style = {
      ...style,
      width: `${widthChip + ((cellSize !== undefined) ? basePx : basePx * 2)}px`,
      maxWidth: `${widthChip + ((cellSize !== undefined) ? basePx : basePx * 2)}px`,
    };
  }
  return style;
};

export const getClassName = (
  isStartPrevMonth: boolean,
  isEndNextMonth: boolean
) => {
  const className = classNames(
    styles.range,
    isStartPrevMonth && styles.startPrev,
    isEndNextMonth && styles.endNext
  );
  return className;
};

// Getting days of the month given days of the week
export const getDaysArray = (date: string, lang: Locale): string[] => {
  const daysInMonth = dayjs(date).daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) =>
    dayjs(date).locale(lang).startOf('month').add(i, 'day').format('dd')
  );
};
