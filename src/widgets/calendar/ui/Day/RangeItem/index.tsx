import { getRangeStyle } from "shared/lib";
import type { IRange } from "entities/range";
import { useCalendarUI } from "shared/context";
import classNames from "classnames";
import styles from "./range.module.css";

type ItemDataProps = {
  dataId: string;
  range: IRange;
  eventLabel?: string;
  eventColor?: string;
};

const getClassName = (isStartPrevMonth: boolean, isEndNextMonth: boolean) => {
  const className = classNames(
    styles.range,
    isStartPrevMonth && styles.startPrev,
    isEndNextMonth && styles.endNext,
  );
  return className;
};

const RangeItem = (props: ItemDataProps) => {
  const { dataId, range, eventLabel, eventColor } = props;
  const { isLoading } = useCalendarUI();

  return (
    <div
      data-tooltip-id={dataId}
      className={getClassName(
        range.isStartPrevMonth ?? false,
        range.isEndNextMonth ?? false,
      )}
      style={{
        ...getRangeStyle(
          range.width!,
          eventColor,
          range.isAllMonth ?? false,
          range.isEndNextMonth ?? false,
        ),
        opacity: isLoading ? 0 : 1,
        transition: "opacity 150ms ease-in-out",
      }}
    >
      {eventLabel}
    </div>
  );
};

export default RangeItem;
