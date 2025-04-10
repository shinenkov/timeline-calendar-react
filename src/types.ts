import { JSX } from "react";

export type UserWithRangeType = {
  id: number;
  name: string;
  department?: string;
  events: RangeType[];
};

export type Department = {
  id: number;
  manager: string;
  name: string;
};

export type User = {
  id: number;
  name: string;
  department?: string | number;
};

export type RangeType = {
  id: number | string;
  startDate: string;
  endDate?: string;
  userId: number | string;
  eventType?: string | number;
  statusType?: string | number;
  comment?: string;
};

export type RangesWithUser = RangeType &
  Pick<User, 'name' | 'department'> & {
    quantity?: number;
    decision?: number;
    department?: string;
    position?: string;
  };

export type StatusType = {
  id: number;
  label: string;
  icon?: JSX.Element | string;
  color?: string;
};

export type EventType = {
  id: number;
  label: string;
  icon?: JSX.Element | string;
  color?: string;
};

export type TimelineCalendarProps = {
  ranges: RangeType[];
  users: User[];
  departments?: Department[];
  events?: EventType[] | string[];
  statuses?: StatusType[] | string[];
  theme?: Theme;
  cellSize?: string;
  accentColor?: string;
  sidebarWidth?: number;
  lang: Locale;
  currentDate?: string;
  openedSidebar: boolean;
};

export type Theme = 'dark' | 'light';

export type Locale = 'en' | 'ru';
