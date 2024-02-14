import Table from "../../components/table/table";

import "./activities_list.css";
import { ActivityRow } from "../../components/table/rows/activity.row/activity_row";
import { useDispatch, useSelector } from "react-redux";
import { selectActivities } from "../../../store/store";
import { ActivityHeader } from "../../components/table/headers/activity_header/activity_header";
import { Fragment, useState } from "react";
import NewRowTile from "../../components/new_row_tile/new_row_tile";

export function ActivitiesList() {
  const activities = useSelector(selectActivities);
  const dispatch = useDispatch();

  const [isArchive, setTableType] = useState(true);

  const openActivities = [];
  const completedActivities = [];

  activities.forEach((element) => {
    if (element.stateId === 3) completedActivities.push(element);
    else openActivities.push(element);
  });

  return (
    <Fragment>
      <NewRowTile
        dispatch={dispatch}
        isArchive={isArchive}
        onHistoryPressed={setTableType}
      />
      <Table header={<ActivityHeader />}>
        {(isArchive ? openActivities : completedActivities).map((e, i) => {
          return (
            <ActivityRow
              activity={e}
              isEven={i % 2 === 0}
              dispatch={dispatch}
            />
          );
        })}
      </Table>
    </Fragment>
  );

  /*
  return (
    <>
      <NewRowTile dispatch={dispatch} isArchive={isArchive} onHistoryPressed={setTableType}/>
      <Table header={<ActivityHeader />}>
        {(isArchive ? openActivities : completedActivities).map((e, i) => {
          return (
            <ActivityRow
              activity={e}
              isEven={i % 2 === 0}
              dispatch={dispatch}
            />
          );
        })}
      </Table>
    </>
  );*/
}
