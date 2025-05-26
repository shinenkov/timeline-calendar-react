import { memo } from "react";
import { defaultTheme } from "shared/lib";
import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import BodyContent from "./ContentBody";
import HeadContent from "./ContentHead";
import Loading from "shared/ui/Loading";
import styles from "app/styles/timeline.module.css";

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

const Content = memo((props: ContentProps) => {
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
      style={{ overflow: cellSize ? "overlay" : "hidden" }}
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
          {!isLoading && tdWidth && (
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
});

export default Content;
