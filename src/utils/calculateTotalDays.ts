export const calculateTotalDays = (allDateDurations: any) => {
  return allDateDurations.reduce(
    (totalDays, dateRange) => totalDays + dateRange.duration,
    0
  );
};
