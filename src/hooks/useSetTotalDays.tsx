import { useEffect } from "react";
import { useDates, ActionType } from "../contexts/DatesProvider";
import { calculateTotalDays } from "../utils/calculateTotalDays";
import "react-datepicker/dist/react-datepicker.css";

export const useSetTotalDays = () => {
  const [state, dispatch] = useDates();

  useEffect(() => {
    dispatch({
      type: ActionType.SumDuration,
      payload: calculateTotalDays(state.dates)
    });
  }, [state.dates, dispatch]);
};
