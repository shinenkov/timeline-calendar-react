import { createContext, useContext } from "react";
import type { Locale, Theme } from "shared/model";

export type CalendarConfig = {
  theme: Theme;
  lang: Locale;
  accentColor: string;
  cellSize?: string;
  sidebarWidth: number;
};

const CalendarConfigContext = createContext<CalendarConfig | null>(null);

export const useCalendarConfig = (): CalendarConfig => {
  const ctx = useContext(CalendarConfigContext);
  if (!ctx) {
    throw new Error(
      "useCalendarConfig must be used within CalendarConfigProvider",
    );
  }
  return ctx;
};

export const CalendarConfigProvider = CalendarConfigContext.Provider;
