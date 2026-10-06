type ValueType = "label" | "color";

type Searchable = {
  id: number | string;
  label?: string;
  color?: string;
};

export const getValue = (
  defaultValue: string,
  attribute?: number | string,
  type?: ValueType,
  array?: Searchable[] | Map<number | string, string>,
): string | undefined => {
  if (attribute === undefined) return defaultValue;

  if (typeof attribute === "string") return attribute;

  if (typeof attribute === "number" && array) {
    if (array instanceof Map) {
      return array.get(attribute) || defaultValue;
    }

    if (Array.isArray(array)) {
      const obj = array.find((o) => o.id === attribute);
      if (type && obj && obj[type]) {
        return obj[type] ?? defaultValue;
      }
    }
  }

  return defaultValue;
};
