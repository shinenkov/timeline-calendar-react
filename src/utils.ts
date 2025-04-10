import dayjs from 'dayjs';
import {
  type RangeType,
  type UserWithRangeType,
  type User,
  type Department,
  type RangesWithUser,
  EventType,
  StatusType,
  Theme,
  Locale,
} from './types';
import { locale } from './locale';

export const createDayLabel = (n: number, lang: Locale) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [locale[lang].day1, locale[lang].day2, locale[lang].day3];
  return `${n} ${
    titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]]
  }`;
};

export interface IRange extends Partial<RangeType> {
  isStart: boolean;
  width?: number;
  isAllMonth?: boolean;
  isStartPrevMonth?: boolean;
  isEndNextMonth?: boolean;
}

export const isSameDate = (date1: string, date2: string) => {
  return (
    dayjs(date1).format('DD-MM-YYYY') === dayjs(date2).format('DD-MM-YYYY')
  );
};

export const defaultTheme = 'light' as Theme;

export const eventColors = [
  '#f44336', // red
  '#2196f3', // blue
  '#4caf50', // green
  '#ffeb3b', // yellow
  '#ff9800', // orange
  '#9c27b0', // purple
  '#673ab7', // indigo
  '#3f51b5', // deep-purple
  '#00bcd4', // cyan
  '#8bc34a', // lime
  '#ff5722', // deep-orange
];

export const defaultColors: Record<Theme, Record<string, string>> = {
  dark: {
    bgPrimary: '#1e2123',
    bgSecondary: '#252525',
    textPrimary: '#ffffffb3',
    textSecondary: '#a1b4d3',
    eventColor: '#f44336',
    statusColor: '#4caf50',
    buttonBg: '#a7bac3',
    boxShadow: '#00000099',
    avatarBg: '#a7bac3',
    avatarColor: '#000000',
    checkmark: '#32373b',
    hoverCheckmark: '#656565',
  },
  light: {
    bgPrimary: '#dbdbde',
    bgSecondary: '#f3f3f3',
    textPrimary: '#000000b3',
    textSecondary: '#cccccc',
    eventColor: '#f44336',
    statusColor: '#4caf50',
    buttonBg: '#455a64',
    boxShadow: '#FFFFFFEA',
    avatarBg: '#455a64',
    avatarColor: '#FFFFFF',
    checkmark: '#c0c3cd',
    hoverCheckmark: '#7f7f7f',
  },
};

// Getting a range of numbers between two dates within a month
export const getRange = (start: number, end: number, currentDate: string) => {
  const curEnd = end < start ? dayjs(currentDate).daysInMonth() : end;
  return [...Array(curEnd - start + 1).keys()].map((n) => n + start);
};

export const stringToEvent = (events: string[]): EventType[] | StatusType[] => {
  const res: EventType[] | StatusType[] = [];
  const freeColors = [...eventColors];
  events.forEach((event, index) => {
    if (!freeColors.length) freeColors.push(...eventColors);
    const randomIndex = Math.floor(Math.random() * freeColors.length);
    res.push({
      id: index,
      label: event,
      icon: undefined,
      color: freeColors.splice(randomIndex, 1)[0],
    });
  });
  return res;
};

type ValueType = 'label' | 'color';
type ArrayType = StatusType[] | EventType[] | Map<number, string>;

export const getValue = (
  defaultValue: string,
  attribute?: number | string,
  type?: ValueType,
  array?: ArrayType
): string | undefined => {
  if (attribute === undefined) {
    return defaultValue;
  }

  if (typeof attribute === 'string') {
    return attribute;
  }

  if (typeof attribute === 'number' && array) {
    if (array instanceof Map) {
      return array.get(attribute) || defaultValue;
    }

    if (Array.isArray(array)) {
      const obj = array.find((o) => o.id === attribute);
      if (type && obj && obj[type]) {
        return type in obj ? obj[type] : defaultValue;
      }
    }
  }

  return defaultValue;
};

export const searchReg = (value: string) =>
  new RegExp(value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

type EventMapType = Map<string | number, string>;

// Helper functions
const createEventMap = (events: EventType[]): EventMapType => {
  if (events.every((s) => typeof s === 'string')) {
    return new Map(events.map((d, index) => [index, d as string]));
  }
  return new Map(events.map((d) => [d.id, d.label]));
};

const isEventMatch = (
  event: RangeType,
  eventMap: EventMapType,
  selectedEvents: EventType[]
): boolean => {
  if (typeof event.eventType === 'number') {
    return eventMap.has(event.eventType);
  }
  return selectedEvents.some(
    (s) => (s as unknown as string) === event.eventType
  );
};

const isStatusMatch = (
  event: RangeType,
  statusMap: EventMapType,
  selectedStatuses: StatusType[]
): boolean => {
  if (typeof event.statusType === 'number') {
    return statusMap.has(event.statusType);
  }
  return selectedStatuses.some(
    (s) => (s as unknown as string) === event.statusType
  );
};

// Combining users with ranges
export const compareUserWithRanges = (
  users: User[] | null,
  events: RangeType[] | null,
  selectedEvents?: EventType[],
  selectedStatuses?: StatusType[],
  searchTerm?: string,
  departments?: Department[]
): UserWithRangeType[] => {
  if (!users) return [];

  const departmentMap = new Map(departments?.map((d) => [d.id, d.name]));
  const eventMap = selectedEvents ? createEventMap(selectedEvents) : undefined;
  const statusMap = selectedStatuses
    ? new Map(selectedStatuses.map((d) => [d.id, d.label]))
    : undefined;

  if (searchTerm && searchTerm.trim().length > 0) {
    users = users.filter((user) => searchReg(searchTerm).test(user.name));
  }
  // Group events by user ID
  const userEventsMap = events?.reduce((acc, event) => {
    const userId = event.userId?.toString();
    if (!userId) return acc;

    const shouldIncludeEvent = (() => {
      if (
        selectedEvents &&
        selectedEvents.length > 0 &&
        selectedStatuses &&
        selectedStatuses.length > 0
      ) {
        return (
          isEventMatch(event, eventMap!, selectedEvents) &&
          isStatusMatch(event, statusMap!, selectedStatuses)
        );
      } else if (selectedEvents && selectedEvents.length > 0) {
        return isEventMatch(event, eventMap!, selectedEvents);
      } else if (selectedStatuses && selectedStatuses.length > 0) {
        return isStatusMatch(event, statusMap!, selectedStatuses);
      }
      return true;
    })();

    if (shouldIncludeEvent) {
      if (!acc.has(userId)) {
        acc.set(userId, []);
      }
      acc.get(userId)!.push(event);
    }
    return acc;
  }, new Map<string, RangeType[]>());

  // Map users to their events
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    department: getValue('', user.department, undefined, departmentMap),
    events: userEventsMap?.get(user.id.toString()) || [],
  }));
};

// Combining ranges with users
export const compareRangesWithUser = (
  events: RangeType[] | null,
  users: User[],
  departments?: Department[]
): RangesWithUser[] => {
  if (!events) {
    return [];
  }

  // Create a map of user IDs to user objects for quick lookup
  const userMap = new Map(users.map((user) => [user.id.toString(), user]));

  // Create a map of department IDs to names for quick lookup
  const departmentMap = new Map(departments?.map((d) => [d.id, d.name]));

  // Process events and create RangesWithUser objects
  return events.reduce<RangesWithUser[]>((acc, event) => {
    const userId = event.userId?.toString();
    const user = userId ? userMap.get(userId) : undefined;

    if (user) {
      let department = '';
      if (user.department !== undefined) {
        if (typeof user.department === 'number') {
          department = departmentMap.get(user.department) || '';
        } else if (typeof user.department === 'string') {
          department = user.department;
        }
      }

      acc.push({
        id: event.id,
        name: user.name,
        department,
        startDate: event.startDate,
        endDate: event.endDate,
        statusType: event.statusType,
        userId: event.userId,
        eventType: event.eventType,
        comment: event.comment ?? '',
      });
    }

    return acc;
  }, []);
};
