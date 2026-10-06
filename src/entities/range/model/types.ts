export type RangeType = {
  id: number | string;
  startDate: string;
  endDate?: string;
  userId: number | string;
  eventType?: string | number;
  statusType?: string | number;
  comment?: string;
};

type IRangeBase = {
  id?: number | string;
  userId?: number | string;
  eventType?: string | number;
  statusType?: string | number;
  comment?: string;
  width?: number;
  isAllMonth?: boolean;
  isStartPrevMonth?: boolean;
  isEndNextMonth?: boolean;
};

export type IRange =
  | (IRangeBase & { isStart: true; startDate: string; endDate: string })
  | (IRangeBase & {
      isStart: false;
      startDate?: undefined;
      endDate?: undefined;
    });
