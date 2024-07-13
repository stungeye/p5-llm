export const VsPinTypes = Object.freeze({
  Number: "number",
  String: "string",
  Boolean: "boolean",
  Object: "object",
});

export function parsePinValue(type, value) {
  switch (type) {
    case VsPinTypes.Number:
      if (typeof value === "number") {
        return value;
      } else if (typeof value === "string") {
        if (isNaN(parseFloat(value))) {
          return null;
        }
        return parseFloat(value);
      }
      break;
    case VsPinTypes.String:
      if (typeof value === "string") {
        return value;
      }
      break;
    case VsPinTypes.Boolean:
      if (typeof value === "boolean") {
        return value;
      } else if (typeof value === "string") {
        const potentialBoolean = value.toLowerCase();
        if (potentialBoolean === "true" || potentialBoolean === "false") {
          return potentialBoolean === "true";
        }
      }
      break;
    case VsPinTypes.Object:
      if (typeof value === "object") {
        return value;
      } else if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return null;
        }
      }
      break;
    default:
      return null;
  }
  return null;
}
