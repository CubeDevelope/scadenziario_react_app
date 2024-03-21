import { TableHeader } from "../../components/table/headers/table.header";
import Table from "../../components/table/table";
import { useDispatch, useSelector } from "react-redux";
import { RecurrenceRow } from "../../components/table/rows/recurrence_row/recurrence_row";
import { selectRecurrence } from "../../../store/store";

export function RecurrenceList() {
  const recurrence = useSelector(selectRecurrence);

  const dispatch = useDispatch();

  return (
    <Table
      header={
        <TableHeader>
          <th>Nome</th>

          <th></th>
          <th></th>
        </TableHeader>
      }
    >
      {recurrence.map((rec) => {
        return (
          <RecurrenceRow
            recurrence={rec}
            isEven={recurrence.indexOf(rec) % 2 === 0}
            dispatch={dispatch}
          />
        );
      })}
    </Table>
  );
}
