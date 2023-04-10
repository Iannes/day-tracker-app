import { differenceInDays } from "date-fns";
import { DateRangeObject } from "../types";

export const createNewDateRange = (
  startDate: Date,
  endDate: Date
): DateRangeObject => {
  return {
    id: Date.now(),
    startDate,
    endDate,
    duration: endDate && startDate ? differenceInDays(endDate, startDate) : 0
  };
};
