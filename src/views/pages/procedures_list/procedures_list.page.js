import { TableHeader } from "../../components/table/headers/table.header";
import Table from "../../components/table/table";
import { ProcedureRow } from "../../components/table/rows/procedure_row/procedure_row";
import { useDispatch, useSelector } from "react-redux";
import { selectProcedures } from "../../../store/store";

export function ProceduresList() {
  const procedures = useSelector(selectProcedures);

  const dispatch = useDispatch();

  return (
    <Table
      header={
        <TableHeader>
          <th></th>
          <th>Nome</th>

          <th></th>
          <th></th>
        </TableHeader>
      }
    >
      {procedures.map((procedure) => {
        return (
          <ProcedureRow
            procedure={procedure}
            isEven={procedures.indexOf(procedure) % 2 === 0}
            dispatch={dispatch}
          />
        );
      })}
    </Table>
  );
}
