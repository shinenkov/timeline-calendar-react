export type RangeType = {
  id: number | string;
  startDate: string;
  endDate?: string;
  userId: number | string;
  eventType?: string | number;
  statusType?: string | number;
  comment?: string;
};

export interface IRange extends Partial<RangeType> {
  isStart: boolean;
  width?: number;
  isAllMonth?: boolean;
  isStartPrevMonth?: boolean;
  isEndNextMonth?: boolean;
}
