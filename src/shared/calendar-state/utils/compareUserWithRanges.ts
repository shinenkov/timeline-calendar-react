import {
  Department,
  EventType,
  RangeType,
  StatusType,
  User,
  UserWithRangeType,
} from "shared/model";
import { getValue } from "shared/lib";

type EventMapType = Map<string | number, string>;

const searchReg = (value: string) =>
  new RegExp(value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");

export const createEventMap = (events: EventType[]): EventMapType => {
  if (events.every((s) => typeof s === "string")) {
    return new Map(events.map((d, index) => [index, d as string]));
  }
  return new Map(events.map((d) => [d.id, d.label]));
};

const isEventMatch = (
  event: RangeType,
  eventMap: EventMapType,
  selectedEvents: EventType[],
): boolean => {
  if (typeof event.eventType === "number") {
    return eventMap.has(event.eventType);
  }
  return selectedEvents.some(
    (s) => (s as unknown as string) === event.eventType,
  );
};

const isStatusMatch = (
  event: RangeType,
  statusMap: EventMapType,
  selectedStatuses: StatusType[],
): boolean => {
  if (typeof event.statusType === "number") {
    return statusMap.has(event.statusType);
  }
  return selectedStatuses.some(
    (s) => (s as unknown as string) === event.statusType,
  );
};

// Combining users with ranges
export const compareUserWithRanges = (
  users: User[] | null,
  events: RangeType[] | null,
  selectedEvents?: EventType[],
  selectedStatuses?: StatusType[],
  searchTerm?: string,
  departments?: Department[],
): UserWithRangeType[] => {
  if (!users) return [];

  const departmentMap = new Map(departments?.map((d) => [d.id, d.name]));
  const eventMap = selectedEvents ? createEventMap(selectedEvents) : undefined;
  const statusMap = selectedStatuses
    ? new Map(selectedStatuses.map((d) => [d.id, d.label]))
    : undefined;

  if (searchTerm && searchTerm.trim().length > 0) {
    users = users.filter((user) => searchReg(searchTerm).test(user.name));
  }
  // Group events by user ID
  const userEventsMap = events?.reduce((acc, event) => {
    const userId = event.userId?.toString();
    if (!userId) return acc;

    const shouldIncludeEvent = (() => {
      if (
        selectedEvents &&
        selectedEvents.length > 0 &&
        selectedStatuses &&
        selectedStatuses.length > 0
      ) {
        return (
          isEventMatch(event, eventMap!, selectedEvents) &&
          isStatusMatch(event, statusMap!, selectedStatuses)
        );
      } else if (selectedEvents && selectedEvents.length > 0) {
        return isEventMatch(event, eventMap!, selectedEvents);
      } else if (selectedStatuses && selectedStatuses.length > 0) {
        return isStatusMatch(event, statusMap!, selectedStatuses);
      }
      return true;
    })();

    if (shouldIncludeEvent) {
      if (!acc.has(userId)) {
        acc.set(userId, []);
      }
      acc.get(userId)!.push(event);
    }
    return acc;
  }, new Map<string, RangeType[]>());

  // Map users to their events
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    department: getValue("", user.department, undefined, departmentMap),
    events: userEventsMap?.get(user.id.toString()) || [],
  }));
};
