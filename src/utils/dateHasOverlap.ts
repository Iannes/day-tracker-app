import { isWithinInterval } from "date-fns";
import { DateRangeObject } from "../types";

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export const dateHasOverlap = (
  dateRange: DateRange,
  existingDateRanges: DateRangeObject[]
): boolean => {
  if (!dateRange.startDate || !dateRange.endDate) {
    return false;
  }
  if (!existingDateRanges || existingDateRanges.length < 1) return false;
  for (const existingDateRange of existingDateRanges) {
    const overlap =
      isWithinInterval(dateRange.startDate, {
        start: new Date(existingDateRange.startDate),
        end: new Date(existingDateRange.endDate)
      }) ||
      isWithinInterval(dateRange.endDate, {
        start: new Date(existingDateRange.startDate),
        end: new Date(existingDateRange.endDate)
      }) ||
      isWithinInterval(existingDateRange.startDate, {
        start: new Date(dateRange.startDate),
        end: new Date(dateRange.endDate)
      });

    if (overlap) {
      return true;
    }
  }

  return false;
};
