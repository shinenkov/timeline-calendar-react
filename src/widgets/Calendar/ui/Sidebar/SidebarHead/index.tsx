import FlexBox from "shared/ui/FlexBox";
import Item from "shared/ui/Item";
import { SidebarToggle } from "features/toggle-sidebar";
import { useCalendarConfig } from "shared/context";
import styles from "app/styles/timeline.module.css";

function HeadSidebar() {
  const { theme } = useCalendarConfig();

  return (
    <FlexBox type="flex" className={styles.headSidebar}>
      <Item
        theme={theme}
        dataTestid="sidebar-head"
        sx={{
          minHeight: "40px",
          border: 0,
          width: "100%",
          textAlign: "left",
          alignItems: "center",
          display: "flex",
        }}
      >
        <SidebarToggle />
      </Item>
    </FlexBox>
  );
}

export default HeadSidebar;
