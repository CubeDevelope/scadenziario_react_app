import { Route, Routes, useNavigate } from "react-router-dom";
import { Drawer } from "../views/components/drawer/drawer";
import { selectActivities, selectDialog } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ErrorPage } from "./404";
import { Fragment, useEffect, useState } from "react";

import "../App.css";
import { ActivitiesList } from "../views/pages/activities_list/activities_list";
import {
  getActiviesFromBE,
  getConstantValues,
  getOperators,
  getProcedures,
} from "../business_logic/network.repository";
import { activitiesSlice, constantSlice } from "../store/slices/data.slice";
import { AlertDialog } from "../views/components/dialogs/delete.dialog/delete.dialog";
import { NewActivityDialog } from "../views/components/dialogs/new_activity_dialog/new_activity_dialog";
import { NewOperatorDialog } from "../views/components/dialogs/new_operator_dialog/new_operator.dialog";
import {
  CreateActivityDialogState,
  CreateOperatorDialogState,
  CreateProcedureDialogState,
  DeleteDialogState,
  EditActivityDialogState,
  UrgencyDialogState,
} from "../views/components/dialogs/dialog_states";
import { EditActivityDialog } from "../views/components/dialogs/edit.dialog/activity.edit.dialog/activity.edit.dialog";
import { UrgencyDialog } from "../views/components/dialogs/urgency.dialog/urgency.dialog";
import { NewProcedureDialog } from "../views/components/dialogs/new_procedure_dialog/new_procedure.dialog";
import { dialogSlice } from "../store/slices/dialog.slice";
import { ProceduresList } from "../views/pages/procedures_list/procedures_list.page";
import { OperatorsList } from "../views/pages/operators_list/operators_list.page";
import { Splashpage } from "../views/pages/splash_page/splash.page";
import { io } from "socket.io-client";

export default function Root() {
  const dialogSelector = useSelector(selectDialog);
  const activities = useSelector(selectActivities);
  const dispatch = useDispatch();

  const router = useNavigate();

  useEffect(() => {
    const connectIoSocket = () => {
      const ioConnection = io("ws://localhost:4000"); //TODO

      ioConnection.on("update_activities", () => {
        addActivity();
      });

      ioConnection.on("server_error", (error) => {
        console.log(error);
      });

      ioConnection.on("update_constants", (update) => {
        switch (update) {
          case "procedure":
            addProcedure();
            break;
          case "operator":
            addOperator();
            break;

          default:
        }
      });
    };

    getActiviesFromBE((data, err) => {
      const urgency = data.filter((act) => {
        return (
          Math.ceil((act.deadline - Date.now()) / (1000 * 60 * 60 * 24)) < 3 &&
          act.stateId !== 3 &&
          act.stateId !== "3"
        );
      });

      dispatch(activitiesSlice.actions.setActivities(data));
      if (urgency.length > 0)
        dispatch(dialogSlice.actions.urgencyDialog(urgency));
    });

    getConstantValues((data, err) => {
      dispatch(constantSlice.actions.setData(data));
      router("activities");
    });

    connectIoSocket();
  }, []);

  const addProcedure = async () => {
    await getProcedures((data) => {
      dispatch(constantSlice.actions.setProcedures(data));
    });
  };

  const addOperator = async () => {
    await getOperators((data) => {
      dispatch(constantSlice.actions.setOperators(data));
    });
  };

  const addActivity = async () => {
    await getActiviesFromBE((data) => {
      dispatch(activitiesSlice.actions.setActivities(data));
    });
  };

  function hideDialog() {
    dispatch(dialogSlice.actions.hideAll());
  }

  function buildDialog() {
    switch (dialogSelector.type.constructor) {
      case DeleteDialogState:
        return (
          <AlertDialog state={dialogSelector.type} onCancelClick={hideDialog} />
        );
      case CreateActivityDialogState:
        return <NewActivityDialog onCancelClick={hideDialog} />;
      case CreateOperatorDialogState:
        return <NewOperatorDialog onCancelClick={hideDialog} />;
      case CreateProcedureDialogState:
        return <NewProcedureDialog onCancelClick={hideDialog} />;

      case EditActivityDialogState:
        return (
          <EditActivityDialog
            state={dialogSelector.type}
            onCancelClick={hideDialog}
          />
        );

      case UrgencyDialogState:
        return (
          <UrgencyDialog
            confirmCallback={hideDialog}
            activities={dialogSelector.type.activities}
          />
        );
      default:
        return <div></div>;
    }
  }

  return (
    <Fragment>
      <div
        onClick={() => {
          dispatch(dialogSlice.actions.hideAll());
        }}
        className={
          dialogSelector.dialogVisible || dialogSelector.drawerVisible
            ? "overflow_dialog_background visible"
            : "overflow_dialog_background notVisible"
        }
      />
      <Drawer isVisible={dialogSelector.drawerVisible} dispatch={dispatch} />

      <div className="appbar">
        <div
          id="hamburgerMenu"
          className="material-symbols-outlined"
          onClick={() => {
            dispatch(dialogSlice.actions.openDrawer());
          }}
        >
          menu
        </div>
      </div>

      <div className="table_container">
        <Routes>
          <Route path="/" element={<Splashpage />} />
          <Route path="/activities" element={<ActivitiesList />} />
          <Route path="/procedures" element={<ProceduresList />} />
          <Route path="/operators" element={<OperatorsList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>

      {dialogSelector.dialogVisible && buildDialog()}
    </Fragment>
  );
}
