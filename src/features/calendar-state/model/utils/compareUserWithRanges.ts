import type { Department, User, UserWithRangeType } from "entities/user";
import type { RangeType } from "entities/range";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
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

const isEventSelected = (event: RangeType, selected: EventType[]): boolean => {
  const { eventType } = event;
  if (eventType === undefined) return false;
  if (typeof eventType === "number") {
    return selected.some((s) => s.id === eventType);
  }
  return selected.some((s) => s.label === eventType);
};

const isStatusSelected = (
  event: RangeType,
  selected: StatusType[],
): boolean => {
  const { statusType } = event;
  if (statusType === undefined) return false;
  if (typeof statusType === "number") {
    return selected.some((s) => s.id === statusType);
  }
  return selected.some((s) => s.label === statusType);
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

  const filteredUsers =
    searchTerm && searchTerm.trim().length > 0
      ? users.filter((user) => searchReg(searchTerm).test(user.name))
      : users;

  const hasEventFilter = !!selectedEvents && selectedEvents.length > 0;
  const hasStatusFilter = !!selectedStatuses && selectedStatuses.length > 0;

  const userEventsMap = events?.reduce((acc, event) => {
    const userId = event.userId?.toString();
    if (!userId) return acc;

    const passesEvent =
      !hasEventFilter || isEventSelected(event, selectedEvents!);
    const passesStatus =
      !hasStatusFilter || isStatusSelected(event, selectedStatuses!);

    if (passesEvent && passesStatus) {
      if (!acc.has(userId)) acc.set(userId, []);
      acc.get(userId)!.push(event);
    }
    return acc;
  }, new Map<string, RangeType[]>());

  // Map users to their events
  return filteredUsers.map((user) => ({
    id: user.id,
    name: user.name,
    department: getValue("", user.department, undefined, departmentMap),
    events: userEventsMap?.get(user.id.toString()) || [],
  }));
};
