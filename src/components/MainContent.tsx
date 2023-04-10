import { useState } from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useDates, ActionType } from "../contexts/DatesProvider";
import { useSetTotalDays } from "../hooks/useSetTotalDays";
import DateInput from "./DateInput";
import Header from "./Header";
import Pie from "./Pie";

const MainContent = () => {
  const [dates, setDates] = useState<any>({ startDate: "", endDate: "" });

  const [state, dispatch] = useDates();

  useSetTotalDays();

  const handleChange = (startDate: Date, endDate: Date) => {
    setDates({
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
  };

  const handleClick = () => {
    dispatch({
      type: ActionType.ToggleDatesModal,
      payload: !state.showDatesModal
    });
  };
  return (
    <>
      <Header />
      {state.showDatesModal ? (
        <DateInput onSelectDateRange={handleChange} />
      ) : (
        <Pie
          numberOfDaysAllowed={state.daysAllowedPerYear}
          numberOfDaysUsed={state.totalNumberOfDays}
        />
      )}
      {state.showDatesModal ? null : (
        <Fab
          onClick={handleClick}
          color="secondary"
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default MainContent;
