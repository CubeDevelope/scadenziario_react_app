import { useContext, useState } from "react";
import { ShowDialogContext } from "../../../../../business_logic/context/app_context";
import { TableRow } from "../table.row";
import { DeleteDialogState } from "../../../dialogs/dialog_states";
import { deleteOperator } from "../../../../../business_logic/network.repository";

export function OperatorRow({ operator, isEven }) {
  const [selectedRow, setSelectedRow] = useState(false);
  const showDialog = useContext(ShowDialogContext);

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
          showDialog(
            new DeleteDialogState(() => {
              deleteOperator(operator.uid);
            })
          );
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
}
