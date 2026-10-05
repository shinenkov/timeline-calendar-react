import FlexBox from "shared/ui/FlexBox";
import { SelectProvider } from "shared/ui";
import { MonthControl } from "features/date-navigation";
import { Search } from "features/search-users";
import { EventSelect } from "features/filter-by-event";
import { StatusSelect } from "features/filter-by-status";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import styles from "./filter.module.css";

type FilterProps = {
  onDateChange: (newDate: string) => void;
  onSearch: (searchTerm: string) => void;
  events?: EventType[];
  statuses?: StatusType[];
  handleEventSelect: (selectedOption: EventType[]) => void;
  handleStatusSelect: (selectedOption: StatusType[]) => void;
};

function Filter({
  onDateChange,
  onSearch,
  events,
  statuses,
  handleEventSelect,
  handleStatusSelect,
}: FilterProps) {
  return (
    <SelectProvider>
      <FlexBox size={12} className={styles.wrap}>
        <FlexBox type="flex" size={12} padding={0} className={styles.container}>
          <FlexBox size={4} className={styles.monthControlContainer}>
            <MonthControl onDateChange={onDateChange} />
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
                    statuses={statuses}
                    selectedStatuses={statuses}
                    onStatusesChange={handleStatusSelect}
                    className={styles.select}
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
                    events={events}
                    selectedEvents={events}
                    onEventsChange={handleEventSelect}
                    className={styles.eventSelect}
                  />
                </FlexBox>
              )}
            </>
            <FlexBox size={4} padding={1} className={styles.searchContainer}>
              <Search onSearch={onSearch} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </SelectProvider>
  );
}

export default Filter;
