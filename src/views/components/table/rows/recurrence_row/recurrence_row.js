import { useContext, useState } from "react";
import { ShowDialogContext } from "../../../../../business_logic/context/app_context";
import { TableRow } from "../table.row";
import { DeleteDialogState } from "../../../dialogs/dialog_states";
import { deleteOperator } from "../../../../../business_logic/network.repository";
import { dialogSlice } from "../../../../../store/slices/dialog.slice";

export function RecurrenceRow({ recurrence, isEven, dispatch }) {
  const [selectedRow, setSelectedRow] = useState(false);

  return (
    <TableRow className={!selectedRow ? isEven && "grey-row" : "selectedRow"}>
      <td>{recurrence.name}</td>
      <td
        className="pointer"
        onClick={() => {
          dispatch(
            dialogSlice.actions.editRecurrence(recurrence)
          );
        }}
      >
        <span class="material-symbols-outlined">edit</span>
      </td>
      <td
        className="pointer"
        onClick={() => {
          dispatch(
            dialogSlice.actions.deleteAlert(() => {
              deleteOperator(recurrence.uid);
            })
          );
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
}
