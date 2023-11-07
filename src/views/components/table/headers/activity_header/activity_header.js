import { useContext } from "react";
import { TableHeader } from "../table.header";
import { AppContext } from "../../../../../business_logic/context/app_context";
import { SortType } from "../../../../../business_logic/utils";

export function ActivityHeader() {
  const sortData = useContext(AppContext).sortData;

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
    null
  ];

  return (
    <TableHeader>
      {headers.map((e) => {
        return (
          <th
            onClick={() => {
              sortData(headersSort.at(headers.indexOf(e)));
            }}
          >
            {e ?? ""}
          </th>
        );
      })}
    </TableHeader>
  );
}
