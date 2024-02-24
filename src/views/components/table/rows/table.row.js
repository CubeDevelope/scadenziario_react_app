import { useRef, useState } from "react";
import "./table.row.css";

export function TableRow({ id, children, style}) {
  const parentHeight = useRef();

  return <div className="tableRow" style={style}>{children}</div>;
}
