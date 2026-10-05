import { Select } from "shared/ui";
import { locale } from "shared/lib";
import type { Locale, Theme } from "shared/model";
import type { StatusType } from "entities/status";

type StatusSelectProps = {
  statuses: StatusType[];
  selectedStatuses: StatusType[];
  onStatusesChange: (statuses: StatusType[]) => void;
  theme: Theme;
  lang: Locale;
  accentColor: string;
  className?: string;
};

export const StatusSelect = ({
  statuses,
  selectedStatuses,
  onStatusesChange,
  theme,
  lang,
  accentColor,
  className,
}: StatusSelectProps) => (
  <Select
    theme={theme}
    optionsList={statuses}
    selectedOptions={selectedStatuses}
    onOptionSelect={(selected) => onStatusesChange(selected as StatusType[])}
    multiselect
    accentColor={accentColor}
    defaultAll={locale[lang].allStatuses}
    defaultText={locale[lang].selectStatus}
    dataTestid="status-select"
    className={className}
  />
);