import React, { useMemo } from "react";
import dayjs from "dayjs";
import type { UserWithRangeType } from "entities/user";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import FlexBox from "shared/ui/FlexBox";
import Day from "../DayItem";
import EmptyDay from "../EmptyDay";
import { getValue, defaultColors } from "shared/lib";
import { getRangesArray } from "entities/range";
import { useCalendarConfig, useCalendarUI } from "shared/context";

type ListRangesByUsersProps = {
  userWithRange: UserWithRangeType[];
  events?: EventType[];
  statuses?: StatusType[];
};

const ListDays = React.memo(function ListDays({
  userWithRange,
  events,
  statuses,
}: ListRangesByUsersProps) {
  const { theme, cellSize } = useCalendarConfig();
  const { currentDate, tdWidth } = useCalendarUI();

  const xsSize = useMemo(
    () => 12 / dayjs(currentDate).daysInMonth(),
    [currentDate],
  );

  return (
    <>
      {userWithRange.map((user) => (
        <FlexBox key={user.id} size={12}>
          <FlexBox type="flex" size={12}>
            {getRangesArray(
              user,
              currentDate,
              cellSize ? Number(cellSize.replace("px", "")) : tdWidth,
            ).map((range, index) => {
              if (range.eventType !== undefined && range.isStart) {
                const eventLabel = getValue(
                  "",
                  range.eventType,
                  "label",
                  events,
                );
                const eventColor = getValue(
                  defaultColors[theme].eventColor,
                  range.eventType,
                  "color",
                  events,
                );
                const statusLabel = getValue(
                  "",
                  range.statusType,
                  "label",
                  statuses,
                );
                const statusColor = getValue(
                  defaultColors[theme].statusColor,
                  range.statusType,
                  "color",
                  statuses,
                );
                return (
                  <Day
                    key={`${user.name}.${index}`}
                    user={user}
                    xsSize={xsSize}
                    range={range}
                    index={index}
                    eventLabel={eventLabel}
                    eventColor={eventColor}
                    statusColor={statusColor}
                    statusLabel={statusLabel}
                  />
                );
              }
              return <EmptyDay xsSize={xsSize} key={`${user.name}.${index}`} />;
            })}
          </FlexBox>
        </FlexBox>
      ))}
    </>
  );
});

export default ListDays;
