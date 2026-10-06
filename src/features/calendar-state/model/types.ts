import type { Theme, Locale } from "shared/model";
import type { RangeType } from "entities/range";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import type { User, Department } from "entities/user";

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
  onCurrentDateChange?: (date: string) => void;
  onOpenedSidebarChange?: (opened: boolean) => void;
};

export type RangesWithUser = RangeType &
  Pick<User, "name" | "department"> & {
    quantity?: number;
    decision?: number;
    department?: string;
    position?: string;
  };
