import { useState, useEffect, useCallback, createRef } from 'react';
import dayjs from 'dayjs';
import {
  EventType,
  StatusType,
  TimelineCalendarProps,
  UserWithRangeType,
} from '../types';
import { compareUserWithRanges, stringToEvent } from '../utils';

export const useTimelineCalendar = (initialProps: TimelineCalendarProps) => {
  const {
    ranges: rangesData,
    users: usersData,
    departments: departmentsData,
    currentDate: propsCurrentDate,
    events,
    statuses,
    openedSidebar,
  } = initialProps;

  const [filteredData, setFilteredData] = useState<UserWithRangeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tdWidth, setTdWidth] = useState<number | null>(null);
  const thRef = createRef<HTMLDivElement>();
  const [openSidebar, setOpenSidebar] = useState(openedSidebar);
  const [currentDate, setCurrentDate] = useState(
    propsCurrentDate ?? dayjs().toString()
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEvents, setCurrentEvents] = useState<EventType[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [currentStatuses, setCurrentStatuses] = useState<StatusType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);

  const updateFilteredData = useCallback(() => {
    if (rangesData && usersData) {
      const data = compareUserWithRanges(
        usersData,
        rangesData,
        selectedEvents,
        selectedStatuses,
        searchTerm,
        departmentsData
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
      if (events.every((e) => typeof e === 'string')) {
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
      if (statuses.every((e) => typeof e === 'string')) {
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
    setOpenSidebar(openedSidebar);
  }, [openedSidebar]);

  useEffect(() => {
    if (propsCurrentDate) {
      setCurrentDate(propsCurrentDate);
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
