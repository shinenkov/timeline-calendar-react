import type { JSX } from "react";

export type StatusType = {
  id: number;
  label: string;
  icon?: JSX.Element | string;
  color?: string;
};