import { useState } from "react";
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
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";

const MainContent = () => {
  const [dates, setDates] = useState<any>({ startDate: "", endDate: "" });
  const { user } = useAppAuth();

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // Initialize Firebase Authentication and get a reference to the service
      const auth = getAuth(app);
      // Initialize Analytics
      const analytics = getAnalytics(app);

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

  if (!user) { 
    return <Navigate replace to={AppRoutes.Login} />; 
  }
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
