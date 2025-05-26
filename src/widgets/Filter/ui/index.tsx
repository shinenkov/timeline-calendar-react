import FlexBox from "shared/ui/FlexBox";
import Select from "shared/ui/Select";
import { SelectProvider } from "shared/ui";
import { EventType, Locale, StatusType, Theme } from "shared/model";
import { locale } from "shared/lib";
import { defaultTheme } from "shared/lib";
import { MonthControl } from "./MonthControl";
import { Search } from "./Search";
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
                  <Select
                    theme={theme}
                    optionsList={statuses}
                    multiselect
                    onOptionSelect={handleStatusSelect}
                    selectedOptions={statuses}
                    className={styles.select}
                    dataTestid="status-select"
                    accentColor={accentColor}
                    defaultAll={locale[lang].allStatuses}
                    defaultText={locale[lang].selectStatus}
                  />
                </FlexBox>
              )}
              {events && events.length > 0 && (
                <FlexBox
                  size={4}
                  padding={1}
                  className={styles.eventSelectContainer}
                >
                  <Select
                    theme={theme}
                    optionsList={events}
                    multiselect
                    onOptionSelect={handleEventSelect}
                    selectedOptions={events}
                    accentColor={accentColor}
                    className={styles.eventSelect}
                    dataTestid="event-select"
                    defaultAll={locale[lang].allEvents}
                    defaultText={locale[lang].selectEvent}
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
