import { useContext, useState } from "react";
import "./activity_row.css";
import {
  AppContext,
  ShowDialogContext,
} from "../../../../../business_logic/context/app_context";
import {
  dateFormatter,
  findElementInList,
} from "../../../../../business_logic/utils";
import { TableRow } from "../table.row";
import {
  DeleteDialogState,
  EditActivityDialogState,
} from "../../../dialogs/dialog_states";
import {
  deleteActivity,
} from "../../../../../business_logic/network.repository";

export function ActivityRow({ activity, isEven }) {
  const data = useContext(AppContext)["constantData"];
  const showDialog = useContext(ShowDialogContext);

  const [selectedRow, setSelectedRow] = useState(false);

  function createUrgencyTitle() {
    var tdClassed = "";

    const diffence = Math.ceil(
      (activity.deadline - Date.now()) / (1000 * 60 * 60 * 24)
    );

    tdClassed = "dot ";
    if (diffence > 30) tdClassed += "greenDot";
    if (diffence <= 30 && diffence > 15) tdClassed += "yellowDot";
    if (diffence <= 15 && diffence > 7) tdClassed += "orangeDot";
    if (diffence <= 7) tdClassed += "redDot";

    return <p className={tdClassed} />;
  }

  const rowId = "row-" + activity.uid;

  return (
    <TableRow
      id={rowId}
      className={!selectedRow ? isEven && "grey-row" : "selectedRow"}
    >
      <td>
        {" "}
        <input
          type="checkbox"
          onChange={() => {
            setSelectedRow(!selectedRow);
          }}
        />
      </td>
      <td>{dateFormatter.format(activity.creationDate)}</td>
      <td>{findElementInList(data.procedures, activity.procedureId)}</td>
      <td>
        {activity.ordinary !== null
          ? findElementInList(data.recurrence, activity.recurrenceId)
          : activity.other}
      </td>
      <td>{dateFormatter.format(activity.deadline)}</td>
      <td>{findElementInList(data.operators, activity.operatorId)}</td>
      <td>
      {findElementInList(data.activityStates, activity.stateId)}
      </td>
      <td>{activity.notes}</td>
      <td>{createUrgencyTitle()}</td>
      <td
        className="pointer"
        onClick={() => {
          showDialog(new EditActivityDialogState(activity));
        }}
      >
        <span class="material-symbols-outlined">edit</span>
      </td>
      <td
        className="pointer"
        onClick={() => {
          showDialog(
            new DeleteDialogState(() => {
              deleteActivity(activity.uid);
            })
          );
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
}
