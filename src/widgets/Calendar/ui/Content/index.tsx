import { memo } from "react";
import type { UserWithRangeType } from "entities/user";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import FlexBox from "shared/ui/FlexBox";
import BodyContent from "./ContentBody";
import HeadContent from "./ContentHead";
import Loading from "shared/ui/Loading";
import { useCalendarConfig, useCalendarUI } from "shared/context";
import styles from "app/styles/timeline.module.css";

type ContentProps = {
  userWithRange: UserWithRangeType[];
  events?: EventType[];
  statuses?: StatusType[];
};

const Content = memo(function Content({
  userWithRange,
  events,
  statuses,
}: ContentProps) {
  const { cellSize } = useCalendarConfig();
  const { isLoading, tdWidth } = useCalendarUI();

  return (
    <FlexBox
      type="flex"
      direction="column"
      className={styles.content}
      style={{ overflow: cellSize ? "overlay" : "hidden" }}
    >
      <FlexBox size={12}>
        <HeadContent />
      </FlexBox>
      <FlexBox size={12}>
        <>
          {isLoading && <Loading dataTestid="loading-indicator" />}
          {!isLoading && tdWidth && (
            <BodyContent
              userWithRange={userWithRange}
              events={events}
              statuses={statuses}
            />
          )}
        </>
      </FlexBox>
    </FlexBox>
  );
});

export default Content;
