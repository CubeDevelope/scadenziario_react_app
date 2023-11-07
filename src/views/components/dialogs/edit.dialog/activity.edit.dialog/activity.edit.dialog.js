import { useContext } from "react";
import { updateActivity } from "../../../../../business_logic/network.repository";
import {
  createOptions,
} from "../../../../../business_logic/utils";
import { BaseDialog } from "../../base_dialog/base.dialog";
import { TitleDialogElement } from "../../components/title_dialog_element.component";
import { EditActivityDialogState } from "../../dialog_states";
import { AppContext } from "../../../../../business_logic/context/app_context";

export function EditActivityDialog({
  state = new EditActivityDialogState(),
  onConfirmCallback,
}) {
  const activity = state.elementToEdit;
  var deadlineSelected = activity.deadline;

  const data = useContext(AppContext).constantData;

  return (
    <BaseDialog
      onConfirmCallback={onConfirmCallback}
      onSaveButton={() => {
        updateActivity(activity);
      }}
      actions={() => {
        return (
          <button className="secondaryButton" onClick={onConfirmCallback}>
            Annulla
          </button>
        );
      }}
    >
      <TitleDialogElement id="operators" title="Operatore">
        {createOptions(data.operators, "operatorsSelector", (event) => {
          activity.operatorId = event.target.value;
        })}
      </TitleDialogElement>

      <TitleDialogElement id="operators" title="Entro quando va fatto">
        <input
          type="date"
          id="deadlineDatePicker"
          onChange={(e) => {
            deadlineSelected = new Date(e.target.value);
            activity.deadline = new Date(e.target.value);
          }}
        />
      </TitleDialogElement>

      <TitleDialogElement id="activity_state" title="Stato attività">
        {createOptions(
          data.activityStates,
          "activityStateSelector",
          (event) => {
            activity.stateId = event.target.value;
          }
        )}
      </TitleDialogElement>

      <TitleDialogElement id="notes" title="Note">
        <textarea
          id="notesTextArea"
          placeholder="Inserisci qui le note riguardati l'attività"
          onChange={(event) => {
            activity.notes = event.target.value;
          }}
        >
          {activity.notes}
        </textarea>
      </TitleDialogElement>
    </BaseDialog>
  );
}
