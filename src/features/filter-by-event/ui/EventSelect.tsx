import { Select } from "shared/ui";
import { locale } from "shared/lib";
import { useCalendarConfig } from "shared/context";
import type { EventType } from "entities/event";

type EventSelectProps = {
  events: EventType[];
  selectedEvents: EventType[];
  onEventsChange: (events: EventType[]) => void;
  className?: string;
};

export const EventSelect = ({
  events,
  selectedEvents,
  onEventsChange,
  className,
}: EventSelectProps) => {
  const { theme, lang, accentColor } = useCalendarConfig();

  return (
    <Select
      theme={theme}
      optionsList={events}
      selectedOptions={selectedEvents}
      onOptionSelect={(selected) => onEventsChange(selected as EventType[])}
      multiselect
      accentColor={accentColor}
      defaultAll={locale[lang].allEvents}
      defaultText={locale[lang].selectEvent}
      dataTestid="event-select"
      className={className}
    />
  );
};
