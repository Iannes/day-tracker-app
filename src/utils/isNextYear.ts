import { addYears, isAfter, isSameYear } from "date-fns";

export const isNextYear = (userDate: Date | null): boolean => {
  if (!userDate) return false;
  const currentDate = new Date();
  const nextYear = addYears(currentDate, 1);
  return isAfter(userDate, currentDate) && isSameYear(userDate, nextYear);
};
