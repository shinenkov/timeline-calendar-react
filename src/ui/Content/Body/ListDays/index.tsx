import React from "react";
import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from "../../../../types";
import { defaultColors, defaultTheme, getValue } from "../../../../utils";
import dayjs from "dayjs";
import { FlexBox } from "../../../../components/FlexBox";
import { getRangesArray } from "./utils";
import Day from "../Day";
import EmptyDay from "../EmptyDay";

type ListRangesByUsersProps = {
  userWithRange: UserWithRangeType[];
  currentDate: string;
  tdWidth: number | null;
  events?: EventType[];
  statuses?: StatusType[];
  theme?: Theme;
  cellSize?: string;
  lang: Locale;
};

const ListDays: React.FC<ListRangesByUsersProps> = React.memo((props) => {
  const {
    userWithRange,
    currentDate,
    tdWidth,
    events,
    statuses,
    theme = defaultTheme,
    cellSize,
    lang,
  } = props;
  const xsSize = 12 / dayjs(currentDate).daysInMonth();
  return (
    <>
      {userWithRange.map((user) => (
        <FlexBox key={user.id} size={12}>
          <FlexBox type={"flex"} size={12}>
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
                    theme={theme}
                    cellSize={cellSize}
                    lang={lang}
                  />
                );
              } else {
                return (
                  <EmptyDay
                    xsSize={xsSize}
                    key={`${user.name}.${index}`}
                    theme={theme}
                    cellSize={cellSize}
                  />
                );
              }
            })}
          </FlexBox>
        </FlexBox>
      ))}
    </>
  );
});
export default ListDays;
