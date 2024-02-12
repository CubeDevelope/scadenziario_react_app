import { createSlice } from "@reduxjs/toolkit";
import {
  CreateActivityDialogState,
  CreateOperatorDialogState,
  CreateProcedureDialogState,
  DeleteDialogState,
  EditActivityDialogState,
  UrgencyDialogState,
} from "../../views/components/dialogs/dialog_states";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    dialogVisible: false,
    drawerVisible: false,
    type: new DeleteDialogState(),
  },
  reducers: {
    openDrawer: (state) => {
      return {
        ...state,
        drawerVisible: true,
      };
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

    hideAll: (state) => {
      return {
        ...state,
        drawerVisible: false,
        dialogVisible: false,
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
  createActivity,
  createOperator,
  createProcedure,
} = dialogSlice.actions;
