import {
  dateFormatter,
  findElementInList,
} from "../../../../../business_logic/utils";
import { selectConstants } from "../../../../../store/store";
import { TableRow } from "../table.row";
import { useDispatch, useSelector } from "react-redux";
import { dialogSlice } from "../../../../../store/slices/dialog.slice";
import { deleteActivity } from "../../../../../business_logic/network.repository";

import "./activity_row.css";
import { useState } from "react";

export function ActivityRow({ activity, isEven }) {
  const constantSelector = useSelector(selectConstants);
  const dispatch = useDispatch();

  const [isSelected, selectRow] = useState(false);

  return (
    <TableRow style={{ backgroundColor: isSelected ? "red" : "transparent" }}>
      <div className="center" style={{ padding: "0 8px" }}>
        <input
          type="checkbox"
          onChange={() => {
            selectRow(!isSelected);
          }}
        />
      </div>
      <div className="tableCell">
        {dateFormatter.format(activity.creationDate)}
      </div>
      <div className="tableCell" >
        {findElementInList(constantSelector.procedures, activity.procedureId)}
      </div>
      <div className="tableCell" style={{flexGrow : 2}}>
        {activity.alternativeName === null
          ? findElementInList(
              constantSelector.recurrence,
              activity.recurrenceId
            )
          : activity.alternativeName}
      </div>
      <div className="tableCell">{dateFormatter.format(activity.deadline)}</div>
      <div className="tableCell">
        {findElementInList(constantSelector.operators, activity.operatorId)}
      </div>
      <div className="tableCell">
        {findElementInList(constantSelector.activityStates, activity.stateId)}
      </div>
      <div className="tableCell" style={{flexGrow : 2}}>{activity.notes}</div>
      <div></div>
      <div
        className="pointer tableCellIcon"
        onClick={() => {
          dispatch(dialogSlice.actions.editActivity(activity));
        }}
      >
        <span className="material-symbols-outlined">edit</span>
      </div>
      <div
        className="pointer tableCellIcon"
        onClick={() => {
          dispatch(
            dialogSlice.actions.deleteAlert(() => {
              deleteActivity(activity.uid);
            })
          );
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </div>
    </TableRow>
  );
}

/*return (
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
        <td
          className="pointer"
          onClick={() => {
            dispatch(dialogSlice.actions.editActivity(activity));
          }}
        >
          <span className="material-symbols-outlined">edit</span>
        </td>
        <td
          className="pointer"
          onClick={() => {
            dispatch(
              dialogSlice.actions.deleteAlert(() => {
                deleteActivity(activity.uid);
              })
            );
          }}
        >
          <span className="material-symbols-outlined">delete</span>
        </td>
      </TableRow>
      );*/
