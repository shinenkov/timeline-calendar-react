import { useEffect, memo, useCallback } from "react";
import FlexBox from "shared/ui/FlexBox";
import { defaultColors, defaultTheme } from "shared/lib";
import { useTimelineCalendar } from "shared/calendar-state";
import { TimelineCalendarWrapperProps } from "shared/model";
import Filter from "widgets/Filter";
import CalendarComponent from "widgets/Calendar";

import styles from "app/styles/timeline.module.css";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import ruRu from "dayjs/locale/ru";
import enEn from "dayjs/locale/en";
import { debounce, isSameDate } from "shared/lib";

/**
 * TimelineCalendar Wrapper
 * @returns TimelineCalendar Component
 */
const TimelineCalendarWrapper: React.FC<TimelineCalendarWrapperProps> = memo(
  (props) => {
    dayjs.extend(customParseFormat);
    dayjs.extend(isBetween);
    dayjs.extend(weekday);
    dayjs.extend(utc);

    const {
      theme = defaultTheme,
      cellSize,
      lang,
      hideFilters,
      accentColor = defaultColors[theme].buttonBg,
      sidebarWidth = 200,
    } = props;

    useEffect(() => {
      if (lang === "en") {
        dayjs.locale(enEn);
      } else if (lang === "ru") {
        dayjs.locale(ruRu);
      }
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

    const onToggleSidebar = useCallback(
      () => setOpenSidebar(!openSidebar),
      [openSidebar, setOpenSidebar],
    );

    return (
      <div className={styles.calendar} data-testid="timeline-calendar">
        <FlexBox type="flex" direction="column">
          <>
            {!hideFilters && (
              <Filter
                theme={theme}
                currentDate={currentDate}
                events={currentEvents}
                statuses={currentStatuses}
                onDateChange={(newDate) => {
                  if (isSameDate(newDate, currentDate)) return;
                  setIsLoading(true);
                  setCurrentDate(newDate);
                }}
                onSearch={handleChangeSearch}
                handleEventSelect={setSelectedEvents}
                handleStatusSelect={setSelectedStatuses}
                accentColor={accentColor}
                lang={lang}
              />
            )}
          </>
          <>
            {filteredData.length > 0 && (
              <FlexBox size={12} padding={1}>
                <CalendarComponent
                  theme={theme}
                  userWithRange={filteredData}
                  currentDate={currentDate}
                  tdWidth={tdWidth}
                  events={currentEvents}
                  statuses={currentStatuses}
                  cellSize={cellSize}
                  isLoading={isLoading}
                  thRef={thRef}
                  openSidebar={openSidebar}
                  accentColor={accentColor}
                  sidebarWidth={sidebarWidth}
                  onToggleSidebar={onToggleSidebar}
                  lang={lang}
                />
              </FlexBox>
            )}
          </>
        </FlexBox>
      </div>
    );
  },
);

export default TimelineCalendarWrapper;
