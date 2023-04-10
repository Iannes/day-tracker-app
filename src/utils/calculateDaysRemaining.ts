import {
  startOfYear,
  endOfYear,
  isWithinInterval,
  differenceInDays,
  addYears
} from "date-fns";

type YearlyDaysRemaining = {
  currentYearDays: number;
  nextYearDays: number;
};

export const calculateDaysRemaining = (
  startDate: Date,
  endDate: Date
): YearlyDaysRemaining => {
  const today = new Date();
  const yearStart = startOfYear(today);
  const yearEnd = endOfYear(today);

  if (
    isWithinInterval(startDate, { start: yearStart, end: yearEnd }) &&
    isWithinInterval(endDate, { start: yearStart, end: yearEnd })
  ) {
    // The dates fall within the current year
    const diffInDays = differenceInDays(endDate, startDate) + 1;
    const currentYearDays = diffInDays;
    const nextYearDays = 0;
    return { currentYearDays, nextYearDays };
  }

  const endOfCurrentYear = endOfYear(today);
  const daysInCurrentYear = differenceInDays(endOfCurrentYear, startDate) + 1;
  const nextYearStartDate = startOfYear(addYears(today, 1));
  const nextYearDays = differenceInDays(endDate, nextYearStartDate) + 1;
  const currentYearDays = daysInCurrentYear;
  return { currentYearDays, nextYearDays };
};
