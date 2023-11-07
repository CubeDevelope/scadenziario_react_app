import { Fragment, useContext } from "react";
import NewRowTile from "../../components/new_row_tile/new_row_tile";
import { ActivitiesList } from "../activities_list/activities_list";
import { AppContext } from "../../../business_logic/context/app_context";
import { OperatorsListPage } from "../operators_list/operators_list.page";
import { ProceduresListPage } from "../procedures_list/procedures_list.page";

export function TablesPage({ tableVisible = 0, setVisibleTable }) {
  const activities = useContext(AppContext).activities;

  function buildTable() {
    switch (tableVisible) {
      case 0:
        return (
          <ActivitiesList
            activities={activities.filter(
              (act) => act.stateId !== 3 && act.stateId !== "3"
            )}
          />
        );
      case 1:
        return (
          <ActivitiesList
            activities={activities.filter(
              (act) => act.stateId === 3 || act.stateId === "3"
            )}
          />
        );
      case 2:
        return <OperatorsListPage />;
      case 3:
        return (
          <ProceduresListPage
            
          />
        );
      default:
        <div></div>;
    }
  }

  return (
    <Fragment>
      {tableVisible === 0 || tableVisible === 1 ? (
        <NewRowTile
          isArchive={tableVisible === 0}
          onHistoryPressed={() => {
            if (tableVisible === 0) setVisibleTable(1);
            else setVisibleTable(0);
          }}
        />
      ) : null}
      {buildTable()}
    </Fragment>
  );
}
