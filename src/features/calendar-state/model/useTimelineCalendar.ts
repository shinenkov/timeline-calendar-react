import { useState, useEffect, useCallback, useRef } from "react";
import dayjs from "dayjs";
import { compareUserWithRanges } from "./utils/compareUserWithRanges";
import { stringToEvent } from "./utils/stringToEvent";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import type { UserWithRangeType } from "entities/user";
import type { TimelineCalendarWrapperProps } from "./types";

export const useTimelineCalendar = (
  initialProps: TimelineCalendarWrapperProps,
) => {
  const {
    ranges: rangesData,
    users: usersData,
    departments: departmentsData,
    currentDate: propsCurrentDate,
    events,
    statuses,
    openedSidebar,
    onCurrentDateChange,
    onOpenedSidebarChange,
  } = initialProps;

  const [filteredData, setFilteredData] = useState<UserWithRangeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tdWidth, setTdWidth] = useState<number | null>(null);
  const thRef = useRef<HTMLDivElement>(null);
  const [openSidebar, setInternalOpenSidebar] = useState(openedSidebar);
  const [currentDate, setInternalCurrentDate] = useState(
    propsCurrentDate ?? dayjs().toString(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEvents, setCurrentEvents] = useState<EventType[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [currentStatuses, setCurrentStatuses] = useState<StatusType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);

  const openSidebarRef = useRef(openSidebar);
  openSidebarRef.current = openSidebar;

  const currentDateRef = useRef(currentDate);
  currentDateRef.current = currentDate;

  const setOpenSidebar = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next =
        typeof value === "function" ? value(openSidebarRef.current) : value;
      setInternalOpenSidebar(next);
      onOpenedSidebarChange?.(next);
    },
    [onOpenedSidebarChange],
  );

  const setCurrentDate = useCallback(
    (value: string | ((prev: string) => string)) => {
      const next =
        typeof value === "function" ? value(currentDateRef.current) : value;
      setInternalCurrentDate(next);
      onCurrentDateChange?.(next);
    },
    [onCurrentDateChange],
  );

  const updateFilteredData = useCallback(() => {
    if (rangesData && usersData) {
      const data = compareUserWithRanges(
        usersData,
        rangesData,
        selectedEvents,
        selectedStatuses,
        searchTerm,
        departmentsData,
      );
      setFilteredData(data);
    }
  }, [
    rangesData,
    usersData,
    selectedEvents,
    selectedStatuses,
    searchTerm,
    departmentsData,
  ]);

  const getTdWidth = useCallback(() => {
    if (thRef.current?.offsetWidth) {
      setTdWidth(thRef.current.offsetWidth / dayjs(currentDate).daysInMonth());
    }
  }, [currentDate, thRef]);

  useEffect(() => {
    if (events) {
      if (events.every((e: string | EventType) => typeof e === "string")) {
        const curEvents = stringToEvent(events);
        setCurrentEvents(curEvents);
        setSelectedEvents(curEvents);
      } else {
        setCurrentEvents(events);
        setSelectedEvents(events);
      }
    }
  }, [events]);

  useEffect(() => {
    if (statuses) {
      if (statuses.every((e: string | StatusType) => typeof e === "string")) {
        const curStatuses = stringToEvent(statuses);
        setCurrentStatuses(curStatuses);
        setSelectedStatuses(curStatuses);
      } else {
        setCurrentStatuses(statuses);
        setSelectedStatuses(statuses);
      }
    }
  }, [statuses]);

  useEffect(() => {
    setInternalOpenSidebar(openedSidebar);
  }, [openedSidebar]);

  useEffect(() => {
    if (propsCurrentDate) {
      setInternalCurrentDate(propsCurrentDate);
    }
  }, [propsCurrentDate]);

  const handleChangeSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return {
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
  };
};
