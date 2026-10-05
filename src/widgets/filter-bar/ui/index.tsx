import FlexBox from "shared/ui/FlexBox";
import { EventSelect } from "features/filter-by-event";
import { StatusSelect } from "features/filter-by-status";
import { SelectProvider } from "shared/ui";
import { Locale, Theme } from "shared/model";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import { defaultTheme } from "shared/lib";
import { MonthControl } from "features/date-navigation";
import { Search } from "features/search-users";
import styles from "./filter.module.css";

type FilterProps = {
  currentDate: string;
  onDateChange: (newDate: string) => void;
  onSearch: (searchTerm: string) => void;
  events?: EventType[];
  statuses?: StatusType[];
  theme?: Theme;
  handleEventSelect?: (selectedOption: EventType[]) => void;
  handleStatusSelect?: (selectedOption: StatusType[]) => void;
  accentColor: string;
  lang: Locale;
};

function Filter({
  currentDate,
  onDateChange,
  onSearch,
  events,
  statuses,
  theme = defaultTheme,
  handleEventSelect,
  handleStatusSelect,
  accentColor,
  lang,
}: FilterProps) {
  return (
    <SelectProvider>
      <FlexBox size={12} className={styles.wrap}>
        <FlexBox type="flex" size={12} padding={0} className={styles.container}>
          <FlexBox size={4} className={styles.monthControlContainer}>
            <MonthControl
              currentDate={currentDate}
              onDateChange={onDateChange}
              lang={lang}
              accentColor={accentColor}
              theme={theme}
            />
          </FlexBox>
          <FlexBox size={8} className={styles.controlsContainer}>
            <>
              {statuses && statuses.length > 0 && (
                <FlexBox
                  size={4}
                  padding={1}
                  className={styles.selectContainer}
                >
                  <StatusSelect
                    theme={theme}
                    statuses={statuses}
                    onStatusesChange={handleStatusSelect!}
                    selectedStatuses={statuses}
                    className={styles.select}
                    accentColor={accentColor}
                    lang={lang}
                  />
                </FlexBox>
              )}
              {events && events.length > 0 && (
                <FlexBox
                  size={4}
                  padding={1}
                  className={styles.eventSelectContainer}
                >
                  <EventSelect
                    theme={theme}
                    events={events}
                    onEventsChange={handleEventSelect!}
                    selectedEvents={events}
                    accentColor={accentColor}
                    className={styles.eventSelect}
                    lang={lang}
                  />
                </FlexBox>
              )}
            </>
            <FlexBox size={4} padding={1} className={styles.searchContainer}>
              <Search onSearch={onSearch} lang={lang} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </SelectProvider>
  );
}

export default Filter;
