import { useContext, useState } from "react";
import { TableHeader } from "../../components/table/headers/table.header";
import Table from "../../components/table/table";
import { AppContext } from "../../../business_logic/context/app_context";
import { OperatorRow } from "../../components/table/rows/operator_row/operator_row";

export function OperatorsListPage() {
  const operators = useContext(AppContext).constantData.operators;

  return (
    <Table
      header={
        <TableHeader>
          <th></th>
          <th>Nome</th>

          <th></th>
        </TableHeader>
      }
    >
      {operators.map((operator) => {
        return (
          <OperatorRow
            operator={operator}
            isEven={operators.indexOf(operator) % 2 === 0}
          />
        );
      })}
    </Table>
  );
}
