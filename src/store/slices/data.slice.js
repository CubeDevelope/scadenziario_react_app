import { createSlice } from "@reduxjs/toolkit";

export const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    data: [],
  },
  reducers: {
    setActivities: (_, activities) => {
      return { data: activities.payload };
    },
  },
});

export const constantSlice = createSlice({
  name: "constants",
  initialState: {
    operators: [],
    procedures: [],
    activityStates: [],
    recurrence: [],
    procedureTypes: [],
  },
  reducers: {
    setData: (_, constants) => {
      return constants.payload;
    },
    setOperators: (state, operators) => {
      return {
        ...state,
        operators: operators.payload,
      };
    },
    setProcedures: (state, procedures) => {
      return {
        ...state,
        procedures: procedures.payload,
      };
    },
  },
});

export const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState: window.innerWidth,
  reducers: {
    changeSize: (state, size) => {
      return size.payload;
    }
  }
});

//Reducers
export const activitiesReducer = activitiesSlice.reducer;
export const constantReducer = constantSlice.reducer;
export const screenSizeReducer = screenSizeSlice.reducer;

//Actions
export const { setActivities } = activitiesSlice.actions;
export const { setData, setOperators, setProcedures } = constantSlice.actions;
