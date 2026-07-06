import strings from "./strings/en.json";

function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

function interpolate(str, vars) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`,
  );
}

export function s(key, options = {}) {
  const { defaultValue, returnObjects, ...vars } = options;
  const value = getNested(strings, key);

  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    return key;
  }

  if (typeof value === "string") {
    return interpolate(value, vars);
  }

  if (returnObjects && (Array.isArray(value) || typeof value === "object")) {
    return value;
  }

  return value;
}

export function getStrings() {
  return strings;
}

export default strings;
