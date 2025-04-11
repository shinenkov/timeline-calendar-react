import { defaultTheme } from "../../../utils";
import { Item } from "../../../components/Item";
import { Theme } from "../../../types";
import { FlexBox } from "../../../components/FlexBox";
import { Button } from "../../../components/Button";
import styles from "../../../timeline.module.css";
import Next from "../../../icons/nextIcon";
import Prev from "../../../icons/prevIcon";

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
          minHeight: "56px",
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
            <Prev fill={accentColor} width={"11px"} height={"11px"} />
          ) : (
            <Next fill={accentColor} width={"11px"} height={"11px"} />
          )}
        </Button>
      </Item>
    </FlexBox>
  );
}

export default HeadSidebar;
