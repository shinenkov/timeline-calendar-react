import React, { memo } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import {
  EventType,
  Locale,
  StatusType,
  Theme,
  UserWithRangeType,
} from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import { defaultTheme } from "shared/lib";
import styles from "app/styles/timeline.module.css";

type CalendarComponentProps = {
  isLoading: boolean;
  currentDate: string;
  thRef: React.RefObject<HTMLDivElement | null>;
  theme?: Theme;
  cellSize?: string;
  userWithRange: UserWithRangeType[];
  tdWidth: number | null;
  events?: EventType[];
  statuses?: StatusType[];
  onToggleSidebar: () => void;
  openSidebar: boolean;
  accentColor: string;
  sidebarWidth: number;
  lang: Locale;
};

const CalendarComponent = memo((props: CalendarComponentProps) => {
  const {
    isLoading,
    currentDate,
    thRef,
    theme = defaultTheme,
    cellSize,
    userWithRange,
    tdWidth,
    events,
    statuses,
    openSidebar,
    onToggleSidebar,
    accentColor,
    sidebarWidth,
    lang,
  } = props;

  return (
    <FlexBox type="flex" className={styles.rounded}>
      <FlexBox
        size={openSidebar ? 2 : 12}
        className={styles.sidebar}
        dataTestid="sidebar-wrapper"
        pxSize={!openSidebar ? "52px" : `${sidebarWidth}px`}
      >
        <Sidebar
          theme={theme}
          accentColor={accentColor}
          userWithRange={userWithRange}
          onToggle={onToggleSidebar}
          opened={openSidebar}
        />
      </FlexBox>
      <FlexBox
        className={styles.content}
        size={openSidebar ? 10 : 12}
        pxSize={
          !openSidebar ? "calc(100% - 52px)" : `calc(100% - ${sidebarWidth}px)`
        }
      >
        <Content
          theme={theme}
          thRef={thRef}
          currentDate={currentDate}
          cellSize={cellSize}
          userWithRange={userWithRange}
          tdWidth={tdWidth}
          events={events}
          isLoading={isLoading}
          statuses={statuses}
          lang={lang}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default memo(CalendarComponent, (prevProps, nextProps) => {
  return (
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.currentDate === nextProps.currentDate &&
    prevProps.thRef === nextProps.thRef &&
    prevProps.theme === nextProps.theme &&
    prevProps.cellSize === nextProps.cellSize &&
    prevProps.userWithRange === nextProps.userWithRange &&
    prevProps.tdWidth === nextProps.tdWidth &&
    prevProps.events === nextProps.events &&
    prevProps.statuses === nextProps.statuses &&
    prevProps.openSidebar === nextProps.openSidebar &&
    prevProps.accentColor === nextProps.accentColor &&
    prevProps.sidebarWidth === nextProps.sidebarWidth &&
    prevProps.lang === nextProps.lang
  );
});
