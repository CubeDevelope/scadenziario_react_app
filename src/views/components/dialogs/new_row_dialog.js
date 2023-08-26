import { useContext, useEffect, useState } from "react";
import "./new_row_dialog.css";
import Procedure from "../../../models/procedure.model";
import Operator from "../../../models/operator.model";
import Activity from "../../../models/activity.model";
import { dateFormatter } from "../../../business_logic/utils";
import AppContext from "../../../business_logic/context/app_context";

export function NewRowDialog({ confermCallback, callback }) {
  const data = useContext(AppContext);

  const [officeActivity, setOfficeActivity] = useState(false);

  function createOptions(data, id) {
    const options = [];

    data.forEach((element) => {
      options.push(<option value={element.name}>{element.name}</option>);
    });
    for (var i = 0; i < data.length; i++) {
      options.push(<option>{data[i].name}</option>);
    }

    return <select id={id}>{options}</select>;
  }

  return (
    <div
      id="insertRowDialog"
      className="dialogBackground notVisible"
      onClick={() => {
        callback(false);
      }}
    >
      <div
        className="dialog"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Nuova attività</h2>
        <div className="spacing" id="procedures">
          <h5>Nome procedura</h5>
          {createOptions(data["procedures"], "proceduresSelector")}
        </div>

        <div className="spacing" id="procedures">
          <h5>Nome procedura</h5>
          {!officeActivity ? (
            createOptions(data["procedures"], "activityNameSelector")
          ) : (
            <input
              id="activityNameText"
              type="text"
              placeholder="Inserisci il nome dell'attività"
            />
          )}
        </div>

        {officeActivity ? <div></div> : <div></div>}
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
        <div className="spacing" id="operators">
          <h5>Operatore</h5>
          {createOptions(data["operators"], "operatorsSelector")}
        </div>

        <input type="date" id="deadlineDatePicker" />

        <div className="spacing">
          <h5>Note</h5>
          <textarea
            id="notesTextArea"
            placeholder="Inserisci qui le note riguardati l'attività"
          ></textarea>
        </div>

        <div className="buttonContainer">
          <button
            className="secondaryButton"
            onClick={() => {
              const proceduresSelector =
                document.getElementById("proceduresSelector");

              const operatorsSelector =
                document.getElementById("operatorsSelector");

              const activityName = document.getElementById("activityNameText");
              const activitySelector = document.getElementById(
                "activityNameSelector"
              );

              const deadlineDatePicker =
                document.getElementById("deadlineDatePicker");

              const notes = document.getElementById("notesTextArea");

              const activity = new Activity(dateFormatter.format(Date.now()));
              activity.name = proceduresSelector.value;
              activity.operator = operatorsSelector.value;
              activity.other = officeActivity ? activityName.value : "";
              activity.ordinary = !officeActivity ? activitySelector.value : "";
              activity.notes = notes.value ?? "";
              activity.deadline = dateFormatter.format(
                Date.parse(deadlineDatePicker.value)
              );

              confermCallback(activity);
            }}
          >
            Inserisci
          </button>
        </div>
      </div>
    </div>
  );
}
