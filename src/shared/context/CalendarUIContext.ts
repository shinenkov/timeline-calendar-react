import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

export type CalendarUI = {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  currentDate: string;
  tdWidth: number | null;
  isLoading: boolean;
  thRef: RefObject<HTMLDivElement | null>;
};

const CalendarUIContext = createContext<CalendarUI | null>(null);

export const useCalendarUI = (): CalendarUI => {
  const ctx = useContext(CalendarUIContext);
  if (!ctx) {
    throw new Error("useCalendarUI must be used within CalendarUIProvider");
  }
  return ctx;
};

export const CalendarUIProvider = CalendarUIContext.Provider;
