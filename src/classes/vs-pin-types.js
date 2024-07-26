export const VsPinTypes = Object.freeze({
  Number: "number",
  String: "string",
  Boolean: "boolean",
  Object: "object",
  Array: "array",
  Function: "function",
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
        const proto = Object.getPrototypeOf(value);
        if (proto === null || proto === Object.prototype) {
          return value;
        }
      } else if (typeof value === "string") {
        try {
          let possibleObject = JSON.parse(value);
          const proto = Object.getPrototypeOf(possibleObject);
          if (proto === null || proto === Object.prototype) {
            return possibleObject;
          }
        } catch (e) {
          return null;
        }
      }
      break;
    case VsPinTypes.Array:
      if (Array.isArray(value)) {
        return value;
      } else if (typeof value === "string") {
        try {
          let possibleArray = JSON.parse(value);
          if (Array.isArray(possibleArray)) {
            return possibleArray;
          }
        } catch (e) {
          return null;
        }
      }
      break;
    case VsPinTypes.Function:
      if (typeof value === "function") {
        return value;
      } else if (typeof value === "string") {
        try {
          return new Function(value);
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
