import { useContext, useState } from "react";
import "./new_activity_dialog.css";
import Activity from "../../../../models/activity.model";
import { BaseDialog } from "../base_dialog/base.dialog";
import { createOptions } from "../../../../business_logic/utils";
import { TitleDialogElement } from "../components/title_dialog_element.component";
import { createNewActivity } from "../../../../business_logic/network.repository";
import { useSelector } from "react-redux";
import { selectConstants } from "../../../../store/store";

export function NewActivityDialog({confermCallback, onCancelClick }) {
  const data = useSelector(selectConstants);

  const [officeActivity, setOfficeActivity] = useState(false);

  var activity;

  activity = new Activity();
  activity.procedureId = data.procedures[0].uid;
  activity.operatorId = data.operators[0].uid;
  activity.recurrenceId = data.recurrence[0].uid;


  return (
    <BaseDialog
      title="Nuova attività"
      actions={() => {
        return (
          <button className="secondaryButton" onClick={onCancelClick}>
            Annulla
          </button>
        );
      }}
      onConfirmCallback={confermCallback}
      onSaveButton={() => {
        if (officeActivity) activity.recurrenceId = null;
        else activity.alternativeName = null;

        createNewActivity(activity)
        onCancelClick();
      }}
    >
      <TitleDialogElement id="procedures" title="Nome procedura">
        {createOptions(data.procedures, "proceduresSelector", (event) => {
          activity.procedureId = event.target.value;
        })}
      </TitleDialogElement>

      <TitleDialogElement id="recurrence" title="Nome dell'attività">
        {!officeActivity ? (
          createOptions(data.recurrence, "recurrenceNameSelector", (event) => {
            activity.recurrenceId = event.target.value;
          })
        ) : (
          <input
            id="activityNameText"
            type="text"
            placeholder="Inserisci il nome dell'attività"
            onChange={(event) => {
              activity.alternativeName = event.target.value;
            }}
          />
        )}
      </TitleDialogElement>

      <div>
        <input
          type="checkbox"
          id="typeOfNameCB"
          onClick={(_) => {
            setOfficeActivity(!officeActivity);
          }}
          checked={officeActivity}
        />
        <label for="typeOfNameCB"> È un'attività d'ufficio</label>
      </div>

      <TitleDialogElement id="operators" title="Operatore">
        {createOptions(data.operators, "operatorsSelector", (event) => {
          activity.operatorId = event.target.value;
        })}
      </TitleDialogElement>

      <TitleDialogElement id="deadline" title="Entro quando va fatto?">
        <input
          type="date"
          id="deadlineDatePicker"
          onChange={(e) => {
            activity.deadline = Date.parse(e.target.value);
          }}
        />
      </TitleDialogElement>

      <TitleDialogElement id="notes" title="Note">
        <textarea
          id="notesTextArea"
          placeholder="Inserisci qui le note riguardati l'attività"
          onChange={(event) => {
            activity.notes = event.target.value;
          }}
        />
      </TitleDialogElement>
    </BaseDialog>
  );
}
