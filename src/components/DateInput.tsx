import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import DatePicker from "react-datepicker";
import { useDates, ActionType } from "../contexts/DatesProvider";
import { createNewDateRange } from "../utils/createNewDateRange";
import { dateHasOverlap } from "../utils/dateHasOverlap";
import { DaysRemaining } from "../DaysRemaining";
import { startOfYear, endOfYear } from "date-fns";
import { safeJsonParse } from "../utils/safeJsonParse";
import { useSetTotalDays } from "../hooks/useSetTotalDays";
import { DateRangeObject } from "../types";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DateInput.css"

type Props = {
  onSelectDateRange: (startDate: Date, endDate: Date) => void;
};

const DateRangeInput: React.FC<Props> = ({ onSelectDateRange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const currentYear = new Date().getFullYear();
  const [state, dispatch] = useDates();

  useSetTotalDays();

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(date);
    }
    onSelectDateRange(date!, endDate!);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (startDate && date && date < startDate) {
      setStartDate(date);
    }
    onSelectDateRange(startDate!, date!);
  };

  const handleClick = () => {
    if (startDate && endDate) {
      const dateRange = {
        startDate,
        endDate
      };

      const savedDateRanges = localStorage.getItem("savedDateRanges");
      const parsed = savedDateRanges
        ? safeJsonParse(savedDateRanges, state.dates)
        : [];

      const hasOverlapWithExistingDates = dateHasOverlap(
        dateRange,
        parsed as DateRangeObject[]
      );
      if (hasOverlapWithExistingDates) {
        dispatch({ type: ActionType.SetDateOverlap, payload: true });
        return;
      }
      const dateObject = createNewDateRange(startDate, endDate);
      dispatch({ type: ActionType.SetDateOverlap, payload: false });
      dispatch({ type: ActionType.SetDates, payload: dateObject });
      dispatch({
        type: ActionType.ToggleDatesModal,
        payload: false
      });
      setStartDate(null);
      setEndDate(null);
    }
  };

  useEffect(() => {
    if (state.dates.length > 0) {
      localStorage.setItem("savedDateRanges", JSON.stringify(state.dates));
    }
  }, [state.dates]);

  return (
    <Container maxWidth="sm">
      <h3>Select a date range:</h3>
      <DatePicker
        className="root"
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={startOfYear(new Date(currentYear))}
        placeholderText="Start Date"
      />
      <DatePicker
        className="root"
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={endOfYear(new Date())}
        disabled={startDate ? false : true}
        placeholderText="End Date"
      />
      <Button
        sx={{ minWidth: "100%" }}
        onClick={handleClick}
        disabled={startDate && endDate ? false : true}
        variant="contained"
        color="secondary"
      >
        Add
      </Button>

      <DaysRemaining
        daysAllowedPerYear={state.daysAllowedPerYear}
        totalNumberOfDays={state.totalNumberOfDays}
      />
    </Container>
  );
};

export default DateRangeInput;
