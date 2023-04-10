export const safeJsonParse = <T>(str: string, defaultValue: T): T | T[] => {
  try {
    return JSON.parse(str) as T;
  } catch (err) {
    console.error(`Error parsing JSON: ${err}`);
    return defaultValue;
  }
};
