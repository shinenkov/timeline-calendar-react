import { Tooltip } from 'react-tooltip';
import { FlexBox } from '../../../../components/FlexBox';
import { UserWithRangeType, Theme, Locale } from '../../../../types';
import { defaultTheme, IRange } from '../../../../utils';
import { Item } from '../../../../components/Item';
import RangeItem from '../RangeItem';
import TooltipContent from '../TooltipContent';
import styles from './day.module.css';

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

  let dataId = `title-${user.name.replace(/\s/g, '').toLocaleLowerCase()}`;
  if (range.startDate !== undefined) {
    dataId += `-${range.startDate?.replace(/[^0-9\s]/gi, '')}`;
  }
  if (range.endDate !== undefined) {
    dataId += `-${range.endDate?.replace(/[^0-9\s]/gi, '')}`;
  }

  const maxWidth = (100 * xsSize) / 12;
  const containerStyle = {
    '--cell-width': cellSize,
    '--max-width': `${maxWidth}%`,
  } as React.CSSProperties;

  return (
    <FlexBox
      size={xsSize}
      className={styles.flexContainer}
      style={containerStyle}
      pxSize={cellSize}
      dataTestid='day-container'
    >
      <Item theme={theme} className={styles.dayContainer}>
        {range.isStart && (
          <div data-testid="range-item">
            <RangeItem
              dataId={dataId}
              range={range}
              index={index}
              cellSize={cellSize}
              eventLabel={eventLabel}
              eventColor={eventColor}
            />
            <Tooltip
              id={dataId}
              opacity={1}
              className={styles.tooltip}
              place={'bottom'}
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
        )}
      </Item>
    </FlexBox>
  );
};

export default Day;
