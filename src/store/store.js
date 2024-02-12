import { configureStore } from "@reduxjs/toolkit";
import { dialogReducer } from "./slices/dialog.slice";
import { activitiesReducer, constantReducer, screenSizeReducer } from "./slices/data.slice";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    activities: activitiesReducer,
    constants : constantReducer,
    pageSize: screenSizeReducer,
  },
});

export const selectDialog = (state) => state.dialog;
export const selectActivities = (state) => state.activities.data;
export const selectConstants = (state) => state.constants;
export const selectOperators = (state) => state.constants.operators;
export const selectActivityStates = (state) => state.constants.activityStates;
export const selectRecurrence = (state) => state.constants.recurrence;
export const selectProcedures = (state) => state.constants.procedures;
export const selectProcedureTypes = (state) => state.constants.procedureTypes;
