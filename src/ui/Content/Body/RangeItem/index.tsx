import { IRange } from '../../../../utils';
import { getRangeStyle, getClassName } from '../../utils';

type ItemDataProps = {
  dataId: string;
  index: number;
  range: IRange;
  cellSize?: string;
  eventLabel?: string;
  eventColor?: string;
};

const RangeItem = (props: ItemDataProps) => {
  const { dataId, range, index, eventLabel, eventColor, cellSize } = props;
  return (
    <div
      data-tooltip-id={dataId}
      className={getClassName(
        range.isStartPrevMonth ?? false,
        range.isEndNextMonth ?? false
      )}
      style={getRangeStyle(
        index + 1,
        index + 1 + range.width!,
        range.width!,
        eventColor,
        range.isAllMonth ?? false,
        range.isEndNextMonth ?? false,
        cellSize,
      )}
    >
      {range.startDate === range.endDate || range.width! <= 64
        ? ''
        : eventLabel}
    </div>
  );
};

export default RangeItem;
