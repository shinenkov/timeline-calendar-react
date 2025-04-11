import TimelineCalendarWrapper from "./TimelineCalendar";
import {
  Department,
  User,
  RangeType,
  EventType,
  StatusType,
  Theme,
  Locale,
} from "./types";

export type {
  User,
  RangeType,
  EventType,
  StatusType,
  Department,
  Locale,
  Theme,
};

export type TimelineCalendarProps = {
  ranges: RangeType[];
  users: User[];
  departments?: Department[];
  events?: EventType[] | string[];
  statuses?: StatusType[] | string[];
  theme?: Theme;
  cellSize?: string;
  lang?: Locale;
  accentColor?: string;
  sidebarWidth?: number;
  openedSidebar?: boolean;
  currentDate?: string;
};

const TimelineCalendar = (props: TimelineCalendarProps) => {
  const {
    ranges,
    users,
    departments,
    events,
    statuses,
    theme,
    cellSize,
    lang = "en",
    accentColor,
    sidebarWidth,
    currentDate,
    openedSidebar = true,
  } = props;

  return (
    <TimelineCalendarWrapper
      ranges={structuredClone(ranges)}
      users={structuredClone(users)}
      departments={structuredClone(departments)}
      events={events}
      statuses={statuses}
      theme={theme}
      cellSize={cellSize}
      lang={lang}
      sidebarWidth={sidebarWidth}
      accentColor={accentColor}
      openedSidebar={openedSidebar}
      currentDate={currentDate}
    />
  );
};

export default TimelineCalendar;
