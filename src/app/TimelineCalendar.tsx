import { useEffect, memo, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import ruRu from "dayjs/locale/ru";
import enEn from "dayjs/locale/en";

import FlexBox from "shared/ui/FlexBox";
import { defaultColors, defaultTheme, debounce, isSameDate } from "shared/lib";
import { useTimelineCalendar } from "features/calendar-state";
import type { TimelineCalendarWrapperProps } from "features/calendar-state";
import {
  CalendarConfigProvider,
  CalendarUIProvider,
  type CalendarConfig,
  type CalendarUI,
} from "shared/context";
import Filter from "widgets/filter-bar";
import CalendarComponent from "widgets/calendar";

import styles from "./styles/timeline.module.css";
import "./styles/global.css";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(utc);

/**
 * TimelineCalendar Wrapper
 * @returns TimelineCalendar Component
 */
const TimelineCalendarWrapper: React.FC<TimelineCalendarWrapperProps> = memo(
  function TimelineCalendarWrapper(props) {
    const {
      theme = defaultTheme,
      cellSize,
      lang = "en",
      hideFilters,
      accentColor = defaultColors[theme].buttonBg,
      sidebarWidth = 200,
    } = props;

    useEffect(() => {
      if (lang === "en") dayjs.locale(enEn);
      else if (lang === "ru") dayjs.locale(ruRu);
    }, [lang]);

    const {
      state: {
        filteredData,
        isLoading,
        tdWidth,
        thRef,
        openSidebar,
        currentDate,
        currentEvents,
        currentStatuses,
      },
      actions: {
        setIsLoading,
        setOpenSidebar,
        setCurrentDate,
        setSelectedEvents,
        setSelectedStatuses,
        handleChangeSearch,
        getTdWidth,
        updateFilteredData,
      },
    } = useTimelineCalendar(props);

    useEffect(() => {
      updateFilteredData();
    }, [updateFilteredData]);

    useEffect(() => {
      const func = debounce(getTdWidth, 300);
      window.addEventListener("resize", func);
      return () => window.removeEventListener("resize", func);
    }, [getTdWidth]);

    useEffect(() => {
      if (thRef.current?.offsetWidth && filteredData.length > 0) {
        getTdWidth();
      }
    }, [getTdWidth, thRef, currentDate, filteredData]);

    useEffect(() => {
      const timer = setTimeout(getTdWidth, 500);
      return () => clearTimeout(timer);
    }, [getTdWidth, openSidebar]);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }, [currentDate, setIsLoading]);

    const onDateChange = useCallback(
      (newDate: string) => {
        if (isSameDate(newDate, currentDate)) return;
        setIsLoading(true);
        setCurrentDate(newDate);
      },
      [currentDate, setIsLoading, setCurrentDate],
    );

    const config = useMemo<CalendarConfig>(
      () => ({ theme, lang, accentColor, cellSize, sidebarWidth }),
      [theme, lang, accentColor, cellSize, sidebarWidth],
    );

    const ui = useMemo<CalendarUI>(
      () => ({
        openSidebar,
        setOpenSidebar,
        currentDate,
        tdWidth,
        isLoading,
        thRef,
      }),
      [openSidebar, setOpenSidebar, currentDate, tdWidth, isLoading, thRef],
    );

    return (
      <div className={styles.calendar} data-testid="timeline-calendar">
        <CalendarConfigProvider value={config}>
          <CalendarUIProvider value={ui}>
            <FlexBox type="flex" direction="column">
              {!hideFilters && (
                <Filter
                  events={currentEvents}
                  statuses={currentStatuses}
                  onDateChange={onDateChange}
                  onSearch={handleChangeSearch}
                  handleEventSelect={setSelectedEvents}
                  handleStatusSelect={setSelectedStatuses}
                />
              )}

              <FlexBox size={12} padding={1}>
                <CalendarComponent
                  userWithRange={filteredData}
                  events={currentEvents}
                  statuses={currentStatuses}
                />
              </FlexBox>
            </FlexBox>
          </CalendarUIProvider>
        </CalendarConfigProvider>
      </div>
    );
  },
);

export default TimelineCalendarWrapper;
