import { ActivityHeader } from "../../components/table/headers/activity_header/activity_header";
import Table from "../../components/table/table";

import "./activities_list.css";
import { ActivityRow } from "../../components/table/rows/activity.row/activity_row";

export function ActivitiesList({ activities }) {
  return (
    <Table activities={activities} header={<ActivityHeader />}>
      {activities.map((act) => {
        return (
          <ActivityRow
            activity={act}
            isEven={activities.indexOf(act) % 2 === 0}
          />
        );
      })}
    </Table>
  );
}
