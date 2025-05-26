import { JSX } from "react";

export type EventType = {
  id: number;
  label: string;
  icon?: JSX.Element | string;
  color?: string;
};

export type StatusType = {
  id: number;
  label: string;
  icon?: JSX.Element | string;
  color?: string;
};
