import { EventType, StatusType } from "shared/model";

type ValueType = "label" | "color";
type ArrayType = StatusType[] | EventType[] | Map<number, string>;

export const getValue = (
  defaultValue: string,
  attribute?: number | string,
  type?: ValueType,
  array?: ArrayType,
): string | undefined => {
  if (attribute === undefined) {
    return defaultValue;
  }

  if (typeof attribute === "string") {
    return attribute;
  }

  if (typeof attribute === "number" && array) {
    if (array instanceof Map) {
      return array.get(attribute) || defaultValue;
    }

    if (Array.isArray(array)) {
      const obj = array.find((o) => o.id === attribute);
      if (type && obj && obj[type]) {
        return type in obj ? obj[type] : defaultValue;
      }
    }
  }

  return defaultValue;
};
