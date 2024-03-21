import { EditRecurrenceDialogState } from "../dialog_states";
import { useSelector } from "react-redux";
import { selectConstants } from "../../../../store/store";
import EditDialog from "./edit.dialog";

export function EditRecurrenceDialog({
  state = new EditRecurrenceDialogState(),
  onCancelClick,
}) {
  const recurrence = state.elementToEdit;

  const data = useSelector(selectConstants);

  return (
    <EditDialog
      onCancelClick={onCancelClick}
      onConfirmClick={(recurrence) => {
        console.log(recurrence)
      }}
      state={state}
    />
  );
}
