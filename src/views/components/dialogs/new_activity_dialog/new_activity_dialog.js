import { useEffect, useState } from "react";
import "./new_activity_dialog.css";
import Activity from "../../../../models/activity.model";
import { BaseDialog } from "../base_dialog/base.dialog";
import { createOptions } from "../../../../business_logic/utils";
import { TitleDialogElement } from "../components/title_dialog_element.component";
import { createNewActivity } from "../../../../business_logic/network.repository";
import { useSelector } from "react-redux";
import { selectConstants } from "../../../../store/store";

export function NewActivityDialog({ onCancelClick }) {
  const data = useSelector(selectConstants);

  const [officeActivity, setOfficeActivity] = useState(false);
  const [activity, setActivity] = useState(new Activity());

  var currentActivity = new Activity();

  useEffect(() => {
    setActivity((act) => {
      return {
        ...act,
        procedureId: data.procedures[0].uid.toString(),
        operatorId: data.operators[0].uid.toString(),
        recurrenceId: data.recurrence[0].uid.toString(),
      };
    });
  }, []);

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
      onSaveButton={() => {
        currentActivity = activity;

        if (officeActivity) currentActivity.recurrenceId = null;
        else currentActivity.alternativeName = null;

        createNewActivity(currentActivity);
        onCancelClick();
      }}
    >
      <TitleDialogElement
        id="procedures"
        title="Tipologia attività standard o previste per legge"
      >
        {createOptions(data.procedures, "proceduresSelector", (event) => {
          setActivity((act) => {
            return { ...act, procedureId: event.target.value };
          });
        })}
      </TitleDialogElement>

      <TitleDialogElement id="recurrence" title="Nome dell'attività">
        {!officeActivity ? (
          createOptions(data.recurrence, "recurrenceNameSelector", (event) => {
            setActivity((act) => {
              return { ...act, recurrenceId: event.target.value };
            });
          })
        ) : (
          <input
            id="activityNameText"
            type="text"
            placeholder="Inserisci il nome dell'attività"
            onChange={(event) => {
              setActivity((act) => {
                return { ...act, alternativeName: event.target.value };
              });
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
          setActivity((act) => {
            return { ...act, operatorId: event.target.value };
          });
        })}
      </TitleDialogElement>

      <TitleDialogElement id="deadline" title="Entro quando va fatto?">
        <input
          type="date"
          id="deadlineDatePicker"
          onChange={(e) => {
            setActivity((act) => {
              return { ...act, deadline: Date.parse(e.target.value) };
            });
          }}
        />
      </TitleDialogElement>

      <TitleDialogElement id="notes" title="Note">
        <textarea
          id="notesTextArea"
          placeholder="Inserisci qui le note riguardati l'attività"
          onChange={(event) => {
            setActivity((act) => {
              return { ...act, notes: event.target.value };
            });
          }}
        />
      </TitleDialogElement>
    </BaseDialog>
  );
}
