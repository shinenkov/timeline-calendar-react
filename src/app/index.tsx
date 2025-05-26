import TimelineCalendarWrapper from "./TimelineCalendar";
import {
  TimelineCalendarProps,
  TimelineOptions,
  Department,
  User,
  RangeType,
  EventType,
  StatusType,
  Theme,
  Locale,
} from "shared/model";

export type {
  TimelineCalendarProps,
  TimelineOptions,
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

  const defaultOptions = {
    theme: "light" as Theme,
    lang: "en" as Locale,
    openedSidebar: true,
    hideFilters: false,
  };

  return (
    <TimelineCalendarWrapper
      ranges={ranges}
      users={users}
      departments={departments}
      events={events}
      statuses={statuses}
      theme={options?.theme ?? defaultOptions.theme}
      cellSize={options?.cellSize}
      lang={options?.lang ?? defaultOptions.lang}
      sidebarWidth={options?.sidebarWidth}
      accentColor={options?.accentColor}
      openedSidebar={options?.openedSidebar ?? defaultOptions.openedSidebar}
      currentDate={options?.currentDate}
      hideFilters={options?.hideFilters ?? defaultOptions.hideFilters}
    />
  );
};

export default TimelineCalendar;
