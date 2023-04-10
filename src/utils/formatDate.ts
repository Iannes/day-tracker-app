import { format } from "date-fns";

export const formatDate = (date: Date) => {
  const formattedDate = format(date, "MMMM dd, yyyy");
  return formattedDate;
};
