import { TableHeader, TableRow } from "../table_row/table_row";

import "./table.css";

export default function Table({ activities }) {
  let rows = [];

  activities.forEach((element) => {
    rows.push(<TableRow activity={element}></TableRow>);
  });

  return (
    <table>
      <thead>
        <TableHeader></TableHeader>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}
