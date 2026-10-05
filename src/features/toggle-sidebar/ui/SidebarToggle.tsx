import { Button, NextIcon, PrevIcon } from "shared/ui";
import { useCalendarConfig, useCalendarUI } from "shared/context";

export const SidebarToggle = () => {
  const { theme, accentColor } = useCalendarConfig();
  const { openSidebar, setOpenSidebar } = useCalendarUI();

  const handleToggle = () => setOpenSidebar((prev) => !prev);

  return (
    <Button
      theme={theme}
      onClick={handleToggle}
      size="small"
      variant="outlined"
      dataTestid="sidebar-toggle"
      accentColor={accentColor}
    >
      {openSidebar ? (
        <PrevIcon theme={theme} fill={accentColor} width="11px" height="11px" />
      ) : (
        <NextIcon theme={theme} fill={accentColor} width="11px" height="11px" />
      )}
    </Button>
  );
};
