export function TableRow({ children, className, id }) {
  return (
    <tr id={id} className={className}>
      {children}
    </tr>
  );
}
