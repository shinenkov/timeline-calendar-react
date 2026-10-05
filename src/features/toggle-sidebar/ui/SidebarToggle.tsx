import { Button, NextIcon, PrevIcon } from "shared/ui";
import type { Theme } from "shared/model";

type SidebarToggleProps = {
  opened: boolean;
  onToggle: () => void;
  theme: Theme;
  accentColor: string;
};

export const SidebarToggle = ({
  opened,
  onToggle,
  theme,
  accentColor,
}: SidebarToggleProps) => (
  <Button
    theme={theme}
    onClick={onToggle}
    size="small"
    variant="outlined"
    dataTestid="sidebar-toggle"
    accentColor={accentColor}
  >
    {opened ? (
      <PrevIcon theme={theme} fill={accentColor} width="11px" height="11px" />
    ) : (
      <NextIcon theme={theme} fill={accentColor} width="11px" height="11px" />
    )}
  </Button>
);
