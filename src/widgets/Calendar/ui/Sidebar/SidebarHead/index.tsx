import FlexBox from "shared/ui/FlexBox";
import Item from "shared/ui/Item";
import { SidebarToggle } from "features/toggle-sidebar";
import { defaultTheme } from "shared/lib";
import type { Theme } from "shared/model";
import styles from "app/styles/timeline.module.css";

type HeadSidebarProps = {
  theme?: Theme;
  onToggle: () => void;
  accentColor: string;
  opened: boolean;
};

function HeadSidebar(props: HeadSidebarProps) {
  const { theme = defaultTheme, onToggle, opened, accentColor } = props;

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
        <SidebarToggle
          opened={opened}
          onToggle={onToggle}
          theme={theme}
          accentColor={accentColor}
        />
      </Item>
    </FlexBox>
  );
}

export default HeadSidebar;
