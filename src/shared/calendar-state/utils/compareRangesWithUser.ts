import {
  type RangeType,
  type User,
  type Department,
  type RangesWithUser,
} from "shared/model";

// Combining ranges with users
export const compareRangesWithUser = (
  events: RangeType[] | null,
  users: User[],
  departments?: Department[],
): RangesWithUser[] => {
  if (!events) {
    return [];
  }

  // Create a map of user IDs to user objects for quick lookup
  const userMap = new Map(users.map((user) => [user.id.toString(), user]));

  // Create a map of department IDs to names for quick lookup
  const departmentMap = new Map(departments?.map((d) => [d.id, d.name]));

  // Process events and create RangesWithUser objects
  return events.reduce<RangesWithUser[]>((acc, event) => {
    const userId = event.userId?.toString();
    const user = userId ? userMap.get(userId) : undefined;

    if (user) {
      let department = "";
      if (user.department !== undefined) {
        if (typeof user.department === "number") {
          department = departmentMap.get(user.department) || "";
        } else if (typeof user.department === "string") {
          department = user.department;
        }
      }

      acc.push({
        id: event.id,
        name: user.name,
        department,
        startDate: event.startDate,
        endDate: event.endDate,
        statusType: event.statusType,
        userId: event.userId,
        eventType: event.eventType,
        comment: event.comment ?? "",
      });
    }

    return acc;
  }, []);
};
