import { BaseDialog } from "../base_dialog/base.dialog";
import { DeleteDialogState } from "../dialog_states";

export function AlertDialog({ onCancelClick, state = DeleteDialogState}) {
  return (
    <BaseDialog
      onSaveButton={() => {
        state.callback();
        onCancelClick();
      }}
      title={state.code}
      buttonTitle={state.code}
      actions={() => {
        return (
          <button className="secondaryButton" onClick={onCancelClick}>
            Annulla
          </button>
        );
      }}
    >
        <h3>{state.description}</h3>
    </BaseDialog>
  );
}
