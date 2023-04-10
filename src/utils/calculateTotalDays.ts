export const calculateTotalDays = (allDateDurations: any) => {
  return allDateDurations.reduce(
    (totalDays: any, dateRange: any) => totalDays + dateRange.duration,
    0
  );
};
