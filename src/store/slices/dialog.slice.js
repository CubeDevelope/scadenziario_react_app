import { createSlice } from "@reduxjs/toolkit";
import {
  CreateActivityDialogState,
  CreateOperatorDialogState,
  CreateProcedureDialogState,
  DeleteDialogState,
  EditActivityDialogState,
  EditRecurrenceDialogState,
  UrgencyDialogState,
} from "../../views/components/dialogs/dialog_states";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    dialogVisible: false,
    drawerVisible: false,
    newElementVisible: false,
    type: new DeleteDialogState(),
  },
  reducers: {
    openDrawer: (state) => {
      return {
        ...state,
        drawerVisible: true,
      };
    },
    openNewElement: (state) => {
      return {
        ...state,
        newElementVisible: true,
      }
    },
    urgencyDialog: (_, activities) => {
      return {
        dialogVisible: true,
        drawerVisible: false,
        type: new UrgencyDialogState(
          activities.payload
        )
      }
    },
    createActivity: (state) => {
      return {
        ...state,
        dialogVisible: true,
        type: new CreateActivityDialogState(),
      };
    },
    createOperator: () => {
      return {
        dialogVisible: true,
        type: new CreateOperatorDialogState(),
      };
    },
    createProcedure: () => {
      return {
        dialogVisible: true,
        type: new CreateProcedureDialogState(),
      };
    },
    editActivity: (_, activity) => {
      return {
        dialogVisible: true,
        type: new EditActivityDialogState(activity.payload),
      };
    },
    editRecurrence: (_, recurrence) => {
      return {
        dialogVisible: true,
        type: new EditRecurrenceDialogState(recurrence.payload),
      };
    },
    deleteAlert: (_, callback) => {
      return {
        drawerVisible: false,
        dialogVisible: true,
        type: new DeleteDialogState(
          callback.payload
        ),
      };
    },

    hideDialog: (state) => {
      return {
        ...state,
        dialogVisible: false,
      };
    },

    hideNewElement: (state) => {
      return {
        ...state,
        newElementVisible: false,
      };
    },

    hideAll: (state) => {
      return {
        ...state,
        drawerVisible: false,
        dialogVisible: false,
        newElementVisible: false,
      };
    },

    hideNewElement: (state) => {
      return {
        ...state,
        newElementVisible: false,
      };
    },

    hideDrawer: (state) => {
      return {
        ...state,
        drawerVisible: false,
      };
    },
  },
});

export const dialogReducer = dialogSlice.reducer;
export const {
  deleteAlert,
  hideDialog,
  editActivity,
  editRecurrence,
  createActivity,
  createOperator,
  createProcedure,
  openNewElement,
  hideNewElement
} = dialogSlice.actions;
