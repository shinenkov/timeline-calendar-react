import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";

const EVENT_COLORS = [
  "#f44336",
  "#2196f3",
  "#4caf50",
  "#ffeb3b",
  "#ff9800",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#00bcd4",
  "#8bc34a",
  "#ff5722",
] as const;

/*
export const stringToEvent = (events: string[]): EventType[] | StatusType[] => {
  const res: EventType[] | StatusType[] = [];
  const freeColors = [...eventColors];
  events.forEach((event, index) => {
    if (!freeColors.length) freeColors.push(...eventColors);
    const randomIndex = Math.floor(Math.random() * freeColors.length);
    res.push({
      id: index,
      label: event,
      icon: undefined,
      color: freeColors.splice(randomIndex, 1)[0],
    });
  });
  return res;
};
*/

export const stringToEvent = (events: string[]): EventType[] | StatusType[] =>
  events.map((label, index) => ({
    id: index,
    label,
    icon: undefined,
    color: EVENT_COLORS[index % EVENT_COLORS.length],
  }));
