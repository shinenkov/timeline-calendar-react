import { useEffect } from "react";
import { FlexBox } from "./components/FlexBox";
import { defaultColors, defaultTheme, isSameDate } from "./utils";
import { useTimelineCalendar } from "./hooks/useTimelineCalendar";
import { TimelineCalendarWrapperProps } from "./types";
import Filter from "./ui/Filter";
import Wrapper from "./ui/Wrapper";
import styles from "./timeline.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import ruRu from "dayjs/locale/ru";
import enEn from "dayjs/locale/en";

/**
 * TimelineCalendar Wrapper
 * @returns TimelineCalendar Component
 */
function TimelineCalendarWrapper(props: TimelineCalendarWrapperProps) {
  dayjs.extend(customParseFormat);
  dayjs.extend(isBetween);
  dayjs.extend(weekday);
  dayjs.extend(utc);

  const {
    theme = defaultTheme,
    cellSize,
    lang,
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
    window.addEventListener("resize", getTdWidth);
    return () => window.removeEventListener("resize", getTdWidth);
  }, [getTdWidth]);

  useEffect(() => {
    getTdWidth();
  }, [getTdWidth, thRef.current?.offsetWidth, currentDate, filteredData]);

  useEffect(() => {
    const timer = setTimeout(getTdWidth, 500);
    return () => clearTimeout(timer);
  }, [getTdWidth, openSidebar]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentDate, setIsLoading]);

  return (
    <div className={styles.calendar} data-testid="timeline-calendar">
      <FlexBox type="flex" direction="column">
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
        <FlexBox size={12} padding={1}>
          <Wrapper
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
            onToggleSidebar={() => setOpenSidebar(!openSidebar)}
            lang={lang}
          />
        </FlexBox>
      </FlexBox>
    </div>
  );
}

export default TimelineCalendarWrapper;
