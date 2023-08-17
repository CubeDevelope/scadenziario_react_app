import { Activity } from "../../models/activity.model";
import { TableHeader, TableRow } from "../table_row/table_row";
import { useState, useEffect } from "react";

import "./table.css";

export function Table() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    createRows();
  }) 

  function createRows() {
    activities.forEach((element) => {
      rows.push(<TableRow activity={element}></TableRow>);
    });
  }

  let rows = [];

  return (
    <table>
      <TableHeader></TableHeader>
      {rows}
    </table>
  );
}
