import { useState } from "react";
import "./activity_row.css";
import {
  dateFormatter,
  findElementInList,
} from "../../../../../business_logic/utils";
import { TableRow } from "../table.row";
import { useDispatch, useSelector } from "react-redux";
import { selectConstants } from "../../../../../store/store";
import { dialogSlice } from "../../../../../store/slices/dialog.slice";
import { deleteActivity } from "../../../../../business_logic/network.repository";

export function ActivityRow({ activity, isEven }) {
  const [selectedRow, setSelectedRow] = useState(false);

  const constantSelector = useSelector(selectConstants);
  const dispatch = useDispatch();

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
      leading={findElementInList(
        constantSelector.procedures,
        activity.procedureId
      )}
      title={activity.alternativeName === null
        ? findElementInList(
            constantSelector.recurrence,
            activity.recurrenceId
          )
        : activity.alternativeName}
      tailing={createUrgencyTitle()}
    >
      <div data-cell="Data creazione: ">{dateFormatter.format(activity.creationDate)}</div>
    </TableRow>
  );

  /*

  return (
    <TableRow
      id={rowId}
      className={!selectedRow ? isEven && "grey-row" : "selectedRow"}
    >
      <td>
        <input
          type="checkbox"
          onChange={() => {
            setSelectedRow(!selectedRow);
          }}
        />
      </td>
      <td>{dateFormatter.format(activity.creationDate)}</td>
      <td>
        {findElementInList(constantSelector.procedures, activity.procedureId)}
      </td>
      <td>
        {activity.alternativeName === null
          ? findElementInList(
              constantSelector.recurrence,
              activity.recurrenceId
            )
          : activity.alternativeName}
      </td>
      <td>{dateFormatter.format(activity.deadline)}</td>
      <td>
        {findElementInList(constantSelector.operators, activity.operatorId)}
      </td>
      <td>
        {findElementInList(constantSelector.activityStates, activity.stateId)}
      </td>
      <td>{activity.notes}</td>
      <td>{createUrgencyTitle()}</td>
      <td className="pointer" onClick={() => {
        dispatch(dialogSlice.actions.editActivity(activity));
      }}>
        <span className="material-symbols-outlined">edit</span>
      </td>
      <td className="pointer" onClick={() => {
        dispatch(dialogSlice.actions.deleteAlert(() => {
          deleteActivity(activity.uid);
        }));

      }}>
        <span className="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
  /*return (
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
  );*/
}
