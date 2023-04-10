import { useDates } from "./contexts/DatesProvider";

import { Typography } from "@mui/material";

type DaysRemainingProps = {
  daysAllowedPerYear: number;
  totalNumberOfDays: number;
};

export const DaysRemaining = ({
  daysAllowedPerYear,
  totalNumberOfDays
}: DaysRemainingProps) => {
  const [state] = useDates();
  const differenceInDays = daysAllowedPerYear - totalNumberOfDays;

  if (state.dateAlreadySet) {
    return (
      <Typography marginTop={5} variant="body1" color="error">
        The selected dates have already been set. Please choose future dates.
      </Typography>
    );
  }

  return <p>{`You have ${differenceInDays} days left`}</p>;
};
