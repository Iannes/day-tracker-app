import React, { createContext, useContext, useEffect, useReducer } from "react";
import { safeJsonParse } from "../utils/safeJsonParse";

import type { DateRangeObject } from "../types";

type State = {
  dates: DateRangeObject[];
  totalNumberOfDays: number;
  daysAllowedPerYear: number;
  dateAlreadySet: boolean;
  showDatesModal: boolean;
};

export enum ActionType {
  SetDates = "SET_DATES",
  SumDuration = "SUM_DURATION",
  SetSaved = "SET_SAVED",
  SetDateOverlap = "SET_DATE_OVERLAP",
  ToggleDatesModal = "TOGGLE_DATES_MODAL"
}

type Actions =
  | {
      type: ActionType.SetDates;
      payload: DateRangeObject;
    }
  | {
      type: ActionType.SumDuration;
      payload: number;
    }
  | {
      type: ActionType.SetSaved;
      payload: DateRangeObject[] | [];
    }
  | {
      type: ActionType.SetDateOverlap;
      payload: boolean;
    }
  | {
      type: ActionType.ToggleDatesModal;
      payload: boolean;
    };

type Dispatch = (action: Actions) => void;

const DatesContext = createContext<[State, Dispatch] | undefined>(undefined);

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetDates:
      const updatedDates = [...state.dates, action.payload];
      return {
        ...state,
        dates: updatedDates
      };
    case ActionType.SumDuration:
      return {
        ...state,
        totalNumberOfDays: action.payload
      };
    case ActionType.SetSaved:
      return {
        ...state,
        dates: action.payload
      };
    case ActionType.SetDateOverlap:
      return {
        ...state,
        dateAlreadySet: action.payload
      };
    case ActionType.ToggleDatesModal:
      return {
        ...state,
        showDatesModal: action.payload
      };
    default:
      return state;
  }
};

const initialState: State = {
  dates: [],
  totalNumberOfDays: 0,
  daysAllowedPerYear: 183,
  dateAlreadySet: false,
  showDatesModal: false
};

export const DatesProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedDateRanges = localStorage.getItem("savedDateRanges");
    const parsed = savedDateRanges
      ? safeJsonParse(savedDateRanges, state.dates)
      : [];
    if (parsed) {
      dispatch({
        type: ActionType.SetSaved,
        payload: parsed as any
      });
    }
  }, []);

  return (
    <DatesContext.Provider value={[state, dispatch]}>
      {children}
    </DatesContext.Provider>
  );
};

export const useDates = () => {
  const context = useContext(DatesContext);
  if (context === undefined) {
    throw new Error("useDates must be used within a DatesProvider");
  }
  return context;
};
