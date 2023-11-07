import { BaseDialog } from "../base_dialog/base.dialog";
import { DeleteDialogState } from "../dialog_states";

export function AlertDialog({ closeDialog, onConfirmButton, state = DeleteDialogState}) {
  return (
    <BaseDialog
      onConfirmCallback={onConfirmButton}
      onSaveButton={state.callback}
      title={state.code}
      buttonTitle={state.code}
      actions={() => {
        return (
          <button className="secondaryButton" onClick={closeDialog}>
            Annulla
          </button>
        );
      }}
    >
        <h3>{state.description}</h3>
    </BaseDialog>
  );
}
