import { EventType, StatusType } from "shared/model";

const eventColors = [
  "#f44336", // red
  "#2196f3", // blue
  "#4caf50", // green
  "#ffeb3b", // yellow
  "#ff9800", // orange
  "#9c27b0", // purple
  "#673ab7", // indigo
  "#3f51b5", // deep-purple
  "#00bcd4", // cyan
  "#8bc34a", // lime
  "#ff5722", // deep-orange
];

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
