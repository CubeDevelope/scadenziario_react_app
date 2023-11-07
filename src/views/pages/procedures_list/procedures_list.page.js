import { useContext } from "react";
import { TableHeader } from "../../components/table/headers/table.header";
import Table from "../../components/table/table";
import { AppContext } from "../../../business_logic/context/app_context";
import { ProcedureRow } from "../../components/table/rows/procedure_row/procedure_row";

export function ProceduresListPage() {
  const procedures = useContext(AppContext).constantData.procedures;

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
          />
        );
      })}
    </Table>
  );
}
