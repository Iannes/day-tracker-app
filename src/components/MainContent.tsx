import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useDates, ActionType } from "../contexts/DatesProvider";
import { useSetTotalDays } from "../hooks/useSetTotalDays";
import DateInput from "./DateInput";
import Header from "./Header";
import Pie from "./Pie";
import { useAppAuth } from "../contexts/AuthProvider";
import { AppRoutes } from "./AppRouter";

const MainContent = () => {
  const [state, dispatch] = useDates();
  const [dates, setDates] = useState<any>({ startDate: "", endDate: "" });
  const { user, pending } = useAppAuth();
  const accessToken  = localStorage.getItem('accessToken');

  if(!accessToken && !pending) {
    return <Navigate to={AppRoutes.Login} />
  }
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

  useEffect(() => {
    console.log('here', state)
    if (state.dates.length > 0) {
      console.log('dates', state.dates)
      localStorage.setItem("savedDateRanges", JSON.stringify(state.dates));
    }
  }, [state.dates]);

  return (
    <div className="main-content">
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
    </div>
  );
};

export default MainContent;
