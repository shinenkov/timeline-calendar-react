import { memo } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import type { UserWithRangeType } from "entities/user";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import FlexBox from "shared/ui/FlexBox";
import { useCalendarConfig, useCalendarUI } from "shared/context";
import styles from "app/styles/timeline.module.css";

type CalendarComponentProps = {
  userWithRange: UserWithRangeType[];
  events?: EventType[];
  statuses?: StatusType[];
};

const CalendarComponent = memo(function CalendarComponent({
  userWithRange,
  events,
  statuses,
}: CalendarComponentProps) {
  const { sidebarWidth } = useCalendarConfig();
  const { openSidebar } = useCalendarUI();

  return (
    <FlexBox type="flex">
      <FlexBox
        size={openSidebar ? 2 : 12}
        className={styles.sidebar}
        dataTestid="sidebar-wrapper"
        pxSize={!openSidebar ? "52px" : `${sidebarWidth}px`}
      >
        <Sidebar userWithRange={userWithRange} />
      </FlexBox>
      <FlexBox
        className={styles.content}
        size={openSidebar ? 10 : 12}
        pxSize={
          !openSidebar ? "calc(100% - 52px)" : `calc(100% - ${sidebarWidth}px)`
        }
      >
        <Content
          userWithRange={userWithRange}
          events={events}
          statuses={statuses}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default CalendarComponent;
