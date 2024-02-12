import { useContext, useState } from "react";
import { ShowDialogContext } from "../../../../../business_logic/context/app_context";
import { TableRow } from "../table.row";
import { DeleteDialogState } from "../../../dialogs/dialog_states";
import { deleteOperator } from "../../../../../business_logic/network.repository";
import { dialogSlice } from "../../../../../store/slices/dialog.slice";

export function OperatorRow({ operator, isEven, dispatch}) {
  const [selectedRow, setSelectedRow] = useState(false);

  return (
    <TableRow className={!selectedRow ? isEven && "grey-row" : "selectedRow"}>
      <td>
        {" "}
        <input
          type="checkbox"
          onChange={() => {
            setSelectedRow(!selectedRow);
          }}
        />
      </td>
      <td>{operator.name}</td>

      <td
        className="pointer"
        onClick={() => {
          dispatch(dialogSlice.actions.deleteAlert(
            () => {
              deleteOperator(operator.uid);
            }
          ))
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
}
