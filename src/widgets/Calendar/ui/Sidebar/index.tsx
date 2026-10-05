import FlexBox from "shared/ui/FlexBox";
import HeadSidebar from "./SidebarHead";
import BodySideBar from "./SidebarBody";
import type { UserWithRangeType } from "entities/user";
import { useCalendarUI } from "shared/context";
import styles from "app/styles/timeline.module.css";

type SideBarProps = {
  userWithRange: UserWithRangeType[];
};

function Sidebar({ userWithRange }: SideBarProps) {
  const { openSidebar } = useCalendarUI();

  return (
    <FlexBox
      dataTestid="sidebar"
      type="flex"
      direction="column"
      className={styles.sidebar + (openSidebar ? " opened" : " closed")}
    >
      <FlexBox size={12}>
        <HeadSidebar />
      </FlexBox>
      <FlexBox size={12}>
        <BodySideBar userWithRange={userWithRange} />
      </FlexBox>
    </FlexBox>
  );
}

export default Sidebar;
