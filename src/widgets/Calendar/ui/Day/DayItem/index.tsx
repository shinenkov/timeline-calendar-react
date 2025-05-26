import { Tooltip } from "react-tooltip";
import FlexBox from "shared/ui/FlexBox";
import { UserWithRangeType, Theme, Locale } from "shared/model";
import { defaultTheme } from "shared/lib";
import Item from "shared/ui/Item";
import RangeItem from "../RangeItem";
import TooltipContent from "../Tooltip";
import styles from "../styles.module.css";
import { IRange } from "shared/model";

type DayOfMonthProps = {
  index: number;
  user: UserWithRangeType;
  range: IRange;
  eventLabel?: string;
  eventColor?: string;
  statusColor?: string;
  statusLabel?: string;
  xsSize: number;
  theme?: Theme;
  cellSize?: string;
  lang: Locale;
};

const Day = (props: DayOfMonthProps) => {
  const {
    user,
    range,
    index,
    eventLabel,
    eventColor,
    statusColor,
    statusLabel,
    xsSize,
    theme = defaultTheme,
    cellSize,
    lang,
  } = props;

  let dataId = `title-${user.name.replace(/\s/g, "").toLocaleLowerCase()}`;
  if (range.startDate !== undefined) {
    dataId += `-${range.startDate?.replace(/[^0-9\s]/gi, "")}`;
  }
  if (range.endDate !== undefined) {
    dataId += `-${range.endDate?.replace(/[^0-9\s]/gi, "")}`;
  }

  const maxWidth = (100 * xsSize) / 12;
  const containerStyle = {
    "--cell-width": cellSize,
    "--max-width": `${maxWidth}%`,
  } as React.CSSProperties;

  return (
    <FlexBox
      size={xsSize}
      className={styles.flexContainer}
      style={containerStyle}
      pxSize={cellSize}
      dataTestid="day-container"
    >
      <Item theme={theme} className={styles.dayContainer}>
        <div data-testid="range-item">
          <RangeItem
            dataId={dataId}
            range={range}
            index={index}
            eventLabel={eventLabel}
            eventColor={eventColor}
          />
          <Tooltip
            id={dataId}
            opacity={1}
            className={styles.tooltip}
            place={"bottom"}
          >
            <TooltipContent
              name={user.name}
              eventLabel={eventLabel}
              eventColor={eventColor}
              startDate={range.startDate!}
              endDate={range.endDate!}
              statusColor={statusColor}
              statusLabel={statusLabel}
              theme={theme}
              lang={lang}
            />
          </Tooltip>
        </div>
      </Item>
    </FlexBox>
  );
};

export default Day;
