import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AppContext,
  ShowDialogContext,
} from "./business_logic/context/app_context";

import {
  SortSubtype,
  SortType,
  baseUrl,
  findElementInList,
} from "./business_logic/utils";
import Operator from "./models/operator.model";
import Recurrence from "./models/recurrence.model";
import ActivityState from "./models/activity_state.model";
import { ProcedureType } from "./models/procedure_type.model";

import "./App.css";
import { TablesPage } from "./views/pages/tables_page/table_page";
import { NewProcedureDialog } from "./views/components/dialogs/new_procedure_dialog/new_procedure.dialog";
import { NewActivityDialog } from "./views/components/dialogs/new_activity_dialog/new_activity_dialog";
import {
  getActiviesFromBE,
  getOperators,
  getProcedures,
} from "./business_logic/network.repository";
import { NewOperatorDialog } from "./views/components/dialogs/new_operator_dialog/new_operator.dialog";
import { Procedure } from "./models/procedure.model";
import { UrgencyDialog } from "./views/components/dialogs/urgency.dialog/urgency.dialog";
import {
  CreateActivityDialogState,
  CreateOperatorDialogState,
  CreateProcedureDialogState,
  DeleteDialogState,
  EditActivityDialogState,
  UrgencyDialogState,
} from "./views/components/dialogs/dialog_states";
import { AlertDialog } from "./views/components/dialogs/delete.dialog/delete.dialog";
import { EditActivityDialog } from "./views/components/dialogs/edit.dialog/activity.edit.dialog/activity.edit.dialog";

import { io } from "socket.io-client";
import { Drawer } from "./views/components/drawer/drawer";

function App() {
  const [visibleDialog, setVisibility] = useState(false);
  const [dialogType, setDialogType] = useState(0);
  const [activities, setActivities] = useState([]);
  const [drawerVisible, setDrawerVisibility] = useState(false);
  const [backgroudVisible, setBackgroundVisibility] = useState(false);
  const [tableVisible, setVisibleTable] = useState(0);
  const [currentSort, setCurrentSort] = useState(SortSubtype.deadlineDown);

 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectIoSocket = () => {
      const ioConnection = io("http://localhost:4000", {});

      ioConnection.on("update_activities", () => {
        addActivity();
        console.log("update_activities");
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
        console.log("update_constants");

      });
    };
    const fetchData = async () => {
      (await fetch(baseUrl + "/getConstantValues")).json().then((data) => {
        const proceduresData = data["procedures"].map((e) => {
          return Procedure.fromJson(e);
        });
        const operatorsData = data["operators"].map((e) =>
          Operator.fromJson(e)
        );
        const recurrenceData = data["recurrence"].map((e) =>
          Recurrence.fromJson(e)
        );
        const activityStatesData = data["activityStates"].map((e) =>
          ActivityState.fromJson(e)
        );
        const procedureTypesData = data["procedureTypes"].map((e) =>
          ProcedureType.fromJson(e)
        );

        setConstantData({
          operators: operatorsData,
          procedures: proceduresData,
          activityStates: activityStatesData,
          recurrence: recurrenceData,
          procedureTypes: procedureTypesData,
        });
      });

      await getActiviesFromBE((data) => {
        if (
          data.filter((act) => {
            return (
              Math.ceil((act.deadline - Date.now()) / (1000 * 60 * 60 * 24)) <
                3 &&
              act.stateId !== 3 &&
              act.stateId !== "3"
            );
          }).length !== 0
        ) {
          setDialogType(new UrgencyDialogState());
          setVisibility(true);
          setBackgroundVisibility(true);
        }
        setActivities(data);
      });

      setLoading(false);
    };

    connectIoSocket();
    fetchData();
  }, []);

  // states

  const showDialogCallback = useCallback((currentDialog) => {
    setDialogType(currentDialog);
    setVisibility(true);
    setBackgroundVisibility(true);
  }, []);

  function editCurrentSort(sort) {
    setCurrentSort(sort);
  }

  const sortData = useCallback(
    (sortCriteria) => {
      var dataSorted = [];
      var sortSubtype = SortSubtype.deadlineUp;

      switch (sortCriteria) {
        case SortType.date:
          dataSorted = [
            ...activities.sort((a, b) => {
              if (currentSort !== SortSubtype.dateUp) {
                if (a.creationDate < b.creationDate) return -1;
                if (a.creationDate > b.creationDate) return 1;
              } else {
                if (a.creationDate > b.creationDate) return -1;
                if (a.creationDate < b.creationDate) return 1;
              }
              return 0;
            }),
          ];
          if (currentSort === SortSubtype.dateUp)
            sortSubtype = SortSubtype.dateDown;
          else sortSubtype = SortSubtype.dateUp;

          break;
        case SortType.procedure:
          dataSorted = [
            ...activities.sort((a, b) => {
              if (currentSort !== SortSubtype.procedureUp) {
                if (a.procedureId < b.procedureId) return -1;
                if (a.procedureId > b.procedureId) return 1;
              } else {
                if (a.procedureId > b.procedureId) return -1;
                if (a.procedureId < b.procedureId) return 1;
              }
              return 0;
            }),
          ];
          if (currentSort === SortSubtype.procedureUp)
            sortSubtype = SortSubtype.procedureDown;
          else sortSubtype = SortSubtype.procedureUp;
          break;

        case SortType.operator:
          dataSorted = [
            ...activities.sort((a, b) => {
              const operatorAName = findElementInList(
                constantData.operators,
                a.operatorId
              );

              const operatorBName = findElementInList(
                constantData.operators,
                b.operatorId
              );

              if (currentSort !== SortSubtype.operatorUp) {
                if (operatorAName < operatorBName) return -1;
                if (operatorAName > operatorBName) return 1;
              } else {
                if (operatorAName > operatorBName) return -1;
                if (operatorAName < operatorBName) return 1;
              }

              return 0;
            }),
          ];

          if (currentSort === SortSubtype.operatorUp)
            sortSubtype = SortSubtype.operatorDown;
          else sortSubtype = SortSubtype.operatorUp;
          break;

        case SortType.deadline:
          dataSorted = [
            ...activities.sort((a, b) => {
              if (currentSort !== SortSubtype.deadlineUp) {
                if (a.deadline < b.deadline) return -1;
                if (a.deadline > b.deadline) return 1;
              } else {
                if (a.deadline > b.deadline) return -1;
                if (a.deadline < b.deadline) return 1;
              }

              return 0;
            }),
          ];

          if (currentSort === SortSubtype.deadlineUp)
            sortSubtype = SortSubtype.deadlineDown;
          else sortSubtype = SortSubtype.deadlineUp;
          break;

        default:
      }

      editCurrentSort(sortSubtype);
      if (dataSorted.length !== 0) setActivities(dataSorted);
    },
    [activities, currentSort, constantData.operators]
  );

  const databaseStateData = useMemo(
    () => ({
      constantData,
      activities,
      sortData,
    }),
    [constantData, activities, sortData]
  );

  // Add elements

  const addProcedure = async () => {
    await getProcedures((data, err) => {
      if (err) {
        throw err;
      }

      const map = {
        ...constantData,
        procedures: data,
      };

      setConstantData(map);
    });
  };

  const addOperator = async () => {
    await getOperators((data, err) => {
      if (err) {
        throw err;
      }

      const map = {
        ...constantData,
        operators: data,
      };

      setConstantData(map);
    });
  };

  const addActivity = async () => {
    await getActiviesFromBE((data, err) => {
      if (err) {
        throw err;
      }

      setActivities(data);
    });
  };

  // build components

  function buildDialog() {
    switch (dialogType.constructor) {
      case DeleteDialogState:
        return (
          <AlertDialog
            closeDialog={hideDialog}
            onConfirmButton={() => {
              hideDialog();
            }}
            state={dialogType}
          />
        );
      case CreateActivityDialogState:
        return (
          <NewActivityDialog
            state={dialogType}
            confermCallback={() => {
              hideDialog();
            }}
          />
        );
      case CreateOperatorDialogState:
        return (
          <NewOperatorDialog
            saveStatusCallback={() => {}}
            confermCallback={() => {
              hideDialog();
            }}
          />
        );
      case CreateProcedureDialogState:
        return (
          <NewProcedureDialog
            saveStatusCallback={() => {}}
            confermCallback={() => {
              hideDialog();
            }}
          />
        );

      case EditActivityDialogState:
        return (
          <EditActivityDialog
            state={dialogType}
            onConfirmCallback={() => {
              hideDialog();
            }}
          />
        );

      case UrgencyDialogState:
        return (
          <UrgencyDialog
            confirmCallback={() => hideDialog()}
            activities={activities.filter((act) => {
              return (
                Math.ceil((act.deadline - Date.now()) / (1000 * 60 * 60 * 24)) <
                  3 &&
                act.stateId !== 3 &&
                act.stateId !== "3"
              );
            })}
          />
        );

      default:
        return <div></div>;
    }
  }

  // show/hide elements

  const showDrawer = () => {
    setDrawerVisibility(true);
    setBackgroundVisibility(true);
  };

  const hideDrawer = () => {
    setDrawerVisibility(false);
    setBackgroundVisibility(false);
  };

  const hideDialog = () => {
    setVisibility(false);
    setBackgroundVisibility(false);
  };

  return (
    <ShowDialogContext.Provider value={showDialogCallback}>
      {loading ? (
        <div className="loading">Caricamento...</div>
      ) : (
        <AppContext.Provider value={databaseStateData}>
          <div
            id="hamburgerMenu"
            onClick={() => {
              showDrawer();
            }}
          ></div>
          <div className="table_container">
            <TablesPage
              tableVisible={tableVisible}
              setVisibleTable={setVisibleTable}
            />
          </div>
          <div
            className={
              "overflow_dialog_background " +
              (backgroudVisible ? "visible" : "notVisible")
            }
            onClick={() => {
              setBackgroundVisibility(false);
              if (visibleDialog) setVisibility(false);
              if (drawerVisible) setDrawerVisibility(false);
            }}
          />
          <div className={visibleDialog ? "visible" : "notVisible"}>
            {buildDialog()}
          </div>
          <Drawer
            isVisible={drawerVisible}
            changeTable={(table) => {
              setVisibleTable(table);
              hideDrawer();
            }}
          />
        </AppContext.Provider>
      )}
    </ShowDialogContext.Provider>
  );
}

export default App;
