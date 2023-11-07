import { useContext, useState } from "react";
import { AppContext, ShowDialogContext } from "../../../../../business_logic/context/app_context";
import { TableRow } from "../table.row";
import { DeleteDialogState } from "../../../dialogs/dialog_states";
import { deleteProcedure } from "../../../../../business_logic/network.repository";
import { findElementInList } from "../../../../../business_logic/utils";

export function ProcedureRow({ procedure, isEven }) {

  const data = useContext(AppContext)["constantData"];

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
      <td>{procedure.name}</td>
      <td>{findElementInList(data.procedureTypes, procedure.procedureTypeId)}</td>
      <td
        className="pointer"
        onClick={() => {
          showDialog(
            new DeleteDialogState(() => {
              deleteProcedure(procedure.uid);
            })
          );
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </td>
    </TableRow>
  );
}
