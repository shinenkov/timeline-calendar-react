import { defaultTheme } from "shared/lib";
import FlexBox from "shared/ui/FlexBox";
import HeadSidebar from "./SidebarHead";
import BodySideBar from "./SidebarBody";
import { UserWithRangeType, Theme } from "shared/model";
import styles from "app/styles/timeline.module.css";

type SideBarProps = {
  theme?: Theme;
  userWithRange: UserWithRangeType[];
  onToggle: () => void;
  opened: boolean;
  accentColor: string;
};

function Sidebar(props: SideBarProps) {
  const {
    theme = defaultTheme,
    userWithRange,
    onToggle,
    opened,
    accentColor,
  } = props;
  return (
    <FlexBox
      dataTestid="sidebar"
      type="flex"
      direction="column"
      className={styles.sidebar + (opened ? " opened" : " closed")}
    >
      <FlexBox size={12}>
        <HeadSidebar
          accentColor={accentColor}
          theme={theme}
          onToggle={onToggle}
          opened={opened}
        />
      </FlexBox>
      <FlexBox size={12}>
        <BodySideBar
          opened={opened}
          theme={theme}
          userWithRange={userWithRange}
        />
      </FlexBox>
    </FlexBox>
  );
}

export default Sidebar;
