import { defaultTheme } from '../../utils';
import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from '../../types';
import { FlexBox } from '../../components/FlexBox';
import { BodyContent } from './Body';
import HeadContent from './Head';
import Loading from '../../components/Loading';
import styles from '../../timeline.module.css';

type ContentProps = {
  currentDate: string;
  thRef: React.RefObject<HTMLDivElement | null>;
  theme?: Theme;
  cellSize?: string;
  userWithRange: UserWithRangeType[];
  tdWidth: number | null;
  events?: EventType[];
  statuses?: StatusType[];
  isLoading: boolean;
  lang: Locale;
};

function Content(props: ContentProps) {
  const {
    currentDate,
    theme = defaultTheme,
    thRef,
    cellSize,
    userWithRange,
    tdWidth,
    events,
    statuses,
    isLoading,
    lang,
  } = props;
  return (
    <FlexBox
      type="flex"
      direction="column"
      className={styles.content}
      style={{ overflow: cellSize ? 'overlay' : 'hidden' }}
    >
      <FlexBox size={12}>
        <HeadContent
          currentDate={currentDate}
          thRef={thRef}
          theme={theme}
          cellSize={cellSize}
          lang={lang}
        />
      </FlexBox>
      <FlexBox size={12}>
        <>
          {isLoading && <Loading dataTestid="loading-indicator" />}
          {!isLoading && (
            <BodyContent
              theme={theme}
              currentDate={currentDate}
              cellSize={cellSize}
              userWithRange={userWithRange}
              tdWidth={tdWidth}
              events={events}
              statuses={statuses}
              lang={lang}
            />
          )}
        </>
      </FlexBox>
    </FlexBox>
  );
}

export default Content;
