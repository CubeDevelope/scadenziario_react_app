import "./base.dialog.css";

export function BaseDialog({
  children,
  actions,
  onSaveButton,
  title = "",
  buttonTitle = "Salva",
  description = "",
}) {
  return (
    <dialog open className="dialog">
      <h3 className="dialogTitle">{title}</h3>
      <h4>{description}</h4>
      {children}
      <div className="buttonContainer">
        {actions?.call()}
        <button
          className="primaryButton"
          onClick={() => {
            onSaveButton?.call();
          }}
        >
          {buttonTitle}
        </button>
      </div>
    </dialog>
  );
}
