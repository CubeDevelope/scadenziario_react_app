import { createOptions } from "../../../../business_logic/utils";
import { BaseDialog } from "../base_dialog/base.dialog";
import { TitleDialogElement } from "../components/title_dialog_element.component";
import { useSelector } from "react-redux";
import { EditRecurrenceDialogState } from "../dialog_states";
import { selectConstants } from "../../../../store/store";

export default function EditDialog({
  onCancelClick,
  onSaveClick,
  state,
  children,
}) {
  const data = useSelector(selectConstants);
  var elementToEdit;

  function buildBody() {
    if (state !== null && state !== undefined)
      switch (state.constructor) {
        case EditRecurrenceDialogState:
          elementToEdit = state.elementToEdit;
          return [
            <TitleDialogElement id="recurrence" title="Nome attività standard">
              <input
                id="activityNameText"
                type="text"
                placeholder="Inserisci il nome dell'attività"
                value={elementToEdit.name}
                onChange={(event) => {
                  elementToEdit.name = event.target.value;
                }}
              />
            </TitleDialogElement>,
          ];
        default:
          return [];
      }
  }
  return (
    <BaseDialog
      onSaveButton={() => {
        onSaveClick?.call(elementToEdit);
      }}
      actions={() => {
        return (
          <button className="secondaryButton" onClick={onCancelClick}>
            Annulla
          </button>
        );
      }}
    >
      {buildBody()}
      {children}
    </BaseDialog>
  );
}
