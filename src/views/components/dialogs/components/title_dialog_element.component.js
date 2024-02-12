export function TitleDialogElement({ id, children, title = "" }) {
  return (
    <div className="spacing" id={id}>
      <h5>{title}</h5>
      {children}
    </div>
  );
}
