import { useState } from "react";
import "./table.row.css";

export function TableRow({ children, className, id }) {
  function buildClassName() {
    return "tableRow " + className;
  }
  return (
    <tr id={id} className={buildClassName()}>
      {children}
    </tr>
  );
}
