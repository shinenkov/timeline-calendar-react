import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from '../../../types';
import { FlexBox } from '../../../components/FlexBox';
import { defaultTheme } from '../../../utils';
import ListDays from './ListDays';
import styles from '../../../timeline.module.css';

type BodyContentProps = {
  userWithRange: UserWithRangeType[];
  currentDate: string;
  tdWidth: number | null;
  events?: EventType[];
  statuses?: StatusType[];
  theme?: Theme;
  cellSize?: string;
  lang: Locale;
};

export const BodyContent = (props: BodyContentProps) => {
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
  return (
    <FlexBox type="flex" direction="column" className={styles.bodyContent}>
      <ListDays
        userWithRange={userWithRange}
        currentDate={currentDate}
        tdWidth={tdWidth}
        events={events}
        statuses={statuses}
        theme={theme}
        cellSize={cellSize}
        lang={lang}
      />
    </FlexBox>
  );
};
