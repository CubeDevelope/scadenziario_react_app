import AppContext from "../../../business_logic/context/app_context";
import { baseUrl } from "../../../business_logic/utils";
import ActivityState from "../../../models/activity_state.model";
import Operator from "../../../models/operator.model";
import Procedure from "../../../models/procedure.model";
import NewRowTile from "../../components/new_row_tile/new_row_tile";
import Table from "../../components/table/table";
import { useState, useEffect, useMemo } from "react";

export function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  const [operators, setOperators] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [activityStates, setActivitieStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const proceduresData = [];
      (await fetch(baseUrl + "/getProcedures")).json().then((data) => {
        data["procedures"].forEach((element) => {
          proceduresData.push(Procedure.fromJson(element));
        });

        setProcedures(proceduresData);
      });
      (await fetch(baseUrl + "/getOperators")).json().then((data) => {
        const operatorsData = [];

        data["operators"].forEach((element) => {
          operatorsData.push(Operator.fromJson(element));
        });

        setOperators(operatorsData);
      });

      (await fetch(baseUrl + "/getActivityStates")).json().then((data) => {
        const activitieStatesData = [];

        data["activityStates"].forEach((element) => {
          activitieStatesData.push(ActivityState.fromJson(element));
        });

        setActivitieStates(activitieStatesData);
      });
    };
    fetchData();
  }, []);

  const databaseStateData = useMemo(
    () => ({
      operators,
      procedures,
      activityStates,
    }),
    [operators, procedures, activityStates]
  );

  function addRow(activity) {
    const acts = [...activities, activity];
    setActivities(acts);
  }

  console.count("Refreshed");

  return (
    <AppContext.Provider value={databaseStateData}>
      <section>
        <Table activities={activities}></Table>
        <NewRowTile onPressed={addRow}></NewRowTile>
      </section>
    </AppContext.Provider>
  );
}
