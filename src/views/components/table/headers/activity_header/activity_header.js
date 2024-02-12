import { TableHeader } from "../table.header";
import { SortType } from "../../../../../business_logic/utils";

export function ActivityHeader() {
  const headers = [
    null,
    "Data",
    "Nome procedura",
    "Attività",
    "Scadenza",
    "Operatore",
    "Stato",
    "Note",
    "Urgenza",
    null,
    null,
  ];

  const headersSort = [
    null,
    SortType.date,
    SortType.procedure,
    SortType.recurrence,
    SortType.deadline,
    SortType.operator,
    SortType.state,
    null,
    SortType.urgency,
    null,
    null,
  ];

  return (
    <TableHeader>
      {headers.map((e) => {
        return <th>{e ?? ""}</th>;
      })}
    </TableHeader>
  );
}
