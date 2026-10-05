import { Theme } from "shared/model";

export const defaultColors: Record<Theme, Record<string, string>> = {
  dark: {
    bgPrimary: "#1e2123",
    bgSecondary: "#252525",
    textPrimary: "#ffffffb3",
    textSecondary: "#a1b4d3",
    eventColor: "#f44336",
    statusColor: "#4caf50",
    buttonBg: "#a7bac3",
    boxShadow: "#00000099",
    avatarBg: "#a7bac3",
    avatarColor: "#000000",
    checkmark: "#32373b",
    hoverCheckmark: "#656565",
  },
  light: {
    bgPrimary: "#dbdbde",
    bgSecondary: "#f3f3f3",
    textPrimary: "#000000b3",
    textSecondary: "#cccccc",
    eventColor: "#f44336",
    statusColor: "#4caf50",
    buttonBg: "#455a64",
    boxShadow: "#FFFFFFEA",
    avatarBg: "#455a64",
    avatarColor: "#FFFFFF",
    checkmark: "#c0c3cd",
    hoverCheckmark: "#7f7f7f",
  },
};
