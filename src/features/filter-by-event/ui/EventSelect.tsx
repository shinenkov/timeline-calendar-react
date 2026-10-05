import { Select } from "shared/ui";
import { locale } from "shared/lib";
import type { Locale, Theme } from "shared/model";
import type { EventType } from "entities/event";

type EventSelectProps = {
  events: EventType[];
  selectedEvents: EventType[];
  onEventsChange: (events: EventType[]) => void;
  theme: Theme;
  lang: Locale;
  accentColor: string;
  className?: string;
};

export const EventSelect = ({
  events,
  selectedEvents,
  onEventsChange,
  theme,
  lang,
  accentColor,
  className,
}: EventSelectProps) => (
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
