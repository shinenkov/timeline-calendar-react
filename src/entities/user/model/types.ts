import type { RangeType } from "entities/range";

export type Department = {
  id: number;
  manager?: string;
  name: string;
};

export type User = {
  id: number;
  name: string;
  department?: string | number;
};

export type UserWithRangeType = {
  id: number;
  name: string;
  department?: string;
  events: RangeType[];
};

export type RangesWithUser = RangeType &
  Pick<User, "name" | "department"> & {
    quantity?: number;
    decision?: number;
    department?: string;
    position?: string;
  };
