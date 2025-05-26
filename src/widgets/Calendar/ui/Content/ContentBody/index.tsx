import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import { defaultTheme } from "shared/lib";
import ListDays from "../../Day/ListDays";
import styles from "app/styles/timeline.module.css";

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

const BodyContent = (props: BodyContentProps) => {
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

export default BodyContent;
