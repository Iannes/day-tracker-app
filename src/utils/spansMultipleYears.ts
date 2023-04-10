import { startOfYear, endOfYear, isWithinInterval } from "date-fns";

export const spansMultipleYears = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const currentYearStart = startOfYear(new Date());
  const currentYearEnd = endOfYear(new Date());

  const isWithinCurrentYear = isWithinInterval(startDate, {
    start: currentYearStart,
    end: currentYearEnd
  });

  const isWithinNextYear = isWithinInterval(endDate, {
    start: startOfYear(new Date(new Date().getFullYear() + 1, 0, 1)),
    end: endOfYear(new Date(new Date().getFullYear() + 1, 11, 31))
  });

  const spansMultipleYears = isWithinCurrentYear && isWithinNextYear;

  return spansMultipleYears;
};
