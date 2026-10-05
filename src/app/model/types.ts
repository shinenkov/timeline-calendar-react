import type { Theme, Locale } from "shared/model";
import type { User, Department } from "entities/user";
import type { RangeType } from "entities/range";
import type { StatusType } from "entities/status";
import type { EventType } from "entities/event";

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
