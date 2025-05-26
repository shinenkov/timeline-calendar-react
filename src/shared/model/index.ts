import type { User, Department } from "./users";
import type { RangeType, IRange } from "./range";
import type { Theme, Locale } from "./theme";
import type { EventType, StatusType } from "./events";

export type { User, Department };
export type { RangeType, IRange };
export type { Theme, Locale };
export type { EventType, StatusType };

export type UserWithRangeType = {
  id: number;
  name: string;
  department?: string;
  events: RangeType[];
};

export type RangesWithUser = RangeType &
  Pick<User, "name" | "department"> & {
    quantity?: number;
    decision?: number;
    department?: string;
    position?: string;
  };

export type TimelineCalendarWrapperProps = {
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
  hideFilters?: boolean;
};

export type TimelineCalendarProps = {
  ranges: RangeType[];
  users: User[];
  departments?: Department[];
  events?: EventType[] | string[];
  statuses?: StatusType[] | string[];
  options?: TimelineOptions;
};

export type TimelineOptions = {
  theme?: Theme;
  cellSize?: string;
  lang?: Locale;
  accentColor?: string;
  sidebarWidth?: number;
  openedSidebar?: boolean;
  currentDate?: string;
  hideFilters?: boolean;
};
