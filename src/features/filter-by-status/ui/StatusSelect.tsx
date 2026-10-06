import { Select } from "shared/ui";
import { locale } from "shared/lib";
import { useCalendarConfig } from "shared/context";
import type { StatusType } from "entities/status";

type StatusSelectProps = {
  statuses: StatusType[];
  selectedStatuses: StatusType[];
  onStatusesChange: (statuses: StatusType[]) => void;
  className?: string;
};

export const StatusSelect = ({
  statuses,
  selectedStatuses,
  onStatusesChange,
  className,
}: StatusSelectProps) => {
  const { theme, lang, accentColor } = useCalendarConfig();

  return (
    <Select<StatusType>
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
};
