import type { User, Department } from "entities/user";
import type { RangeType } from "entities/range";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";

export const mockUsers: User[] = [
  { id: 1, name: "John Doe", department: "Sales" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Brown", department: 10 },
];

export const mockDepartments: Department[] = [{ id: 10, name: "Engineering" }];

export const mockRanges: RangeType[] = [
  {
    id: 1,
    userId: 1,
    eventType: 1,
    statusType: 1,
    startDate: "2025-04-01",
    endDate: "2025-04-05",
  },
  {
    id: 2,
    userId: 2,
    eventType: 2,
    statusType: 2,
    startDate: "2025-04-10",
    endDate: "2025-04-15",
  },
];

export const mockEvents: EventType[] = [
  { id: 1, label: "Vacation" },
  { id: 2, label: "Sick leave" },
];

export const mockStatuses: StatusType[] = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Pending" },
];
