import { Locale } from "shared/model";
import { LocaleDict } from "shared/model/locale";

export const locale: Record<Locale, LocaleDict> = {
  ru: {
    from: "с",
    to: "по",
    status: "статус",
    allStatuses: "Все статусы",
    selectStatus: "Выбрать тип статуса",
    allEvents: "Все события",
    selectEvent: "Выбрать тип события",
    currentMonth: "Текущий месяц",
    search: "Поиск",
    day1: "День",
    day2: "Дня",
    day3: "Дней",
  },
  en: {
    from: "from",
    to: "to",
    status: "status",
    allStatuses: "All statuses",
    selectStatus: "Select status type",
    allEvents: "All events",
    selectEvent: "Select event type",
    currentMonth: "Current month",
    search: "Search",
    day1: "Day",
    day2: "Days",
    day3: "Days",
  },
};
