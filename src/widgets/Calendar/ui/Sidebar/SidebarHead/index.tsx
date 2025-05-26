import { defaultTheme } from "shared/lib";
import Item from "shared/ui/Item";
import { Theme } from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import Button from "shared/ui/Button";
import styles from "app/styles/timeline.module.css";
import { NextIcon, PrevIcon } from "shared/ui";

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
        <Button
          theme={theme}
          onClick={onToggle}
          size={"small"}
          variant={"outlined"}
          dataTestid="sidebar-toggle"
          accentColor={accentColor}
        >
          {opened ? (
            <PrevIcon
              theme={theme}
              fill={accentColor}
              width={"11px"}
              height={"11px"}
            />
          ) : (
            <NextIcon
              theme={theme}
              fill={accentColor}
              width={"11px"}
              height={"11px"}
            />
          )}
        </Button>
      </Item>
    </FlexBox>
  );
}

export default HeadSidebar;
