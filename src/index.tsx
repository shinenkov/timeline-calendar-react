import TimelineCalendarWrapper from "./TimelineCalendar";
import {
  TimelineCalendarProps,
  Department,
  User,
  RangeType,
  EventType,
  StatusType,
  Theme,
  Locale,
} from "./types";

export type {
  TimelineCalendarProps,
  User,
  RangeType,
  EventType,
  StatusType,
  Department,
  Locale,
  Theme,
};

const TimelineCalendar = (props: TimelineCalendarProps) => {
  const { ranges, users, departments, events, statuses, options } = props;

  return (
    <TimelineCalendarWrapper
      ranges={structuredClone(ranges)}
      users={structuredClone(users)}
      departments={structuredClone(departments)}
      events={events}
      statuses={statuses}
      theme={options?.theme ?? "light"}
      cellSize={options?.cellSize}
      lang={options?.lang ?? "en"}
      sidebarWidth={options?.sidebarWidth}
      accentColor={options?.accentColor}
      openedSidebar={options?.openedSidebar ?? true}
      currentDate={options?.currentDate}
      hideFilters={options?.hideFilters ?? false}
    />
  );
};

export default TimelineCalendar;
