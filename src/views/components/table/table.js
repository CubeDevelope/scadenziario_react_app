
import "./table.css";

export default function Table({ children, header}) {

  return (
    <table>
      <thead>
      {header}
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}
