import { useContext } from "react";
import { AppContext } from "../../../../business_logic/context/app_context";
import { BaseDialog } from "../base_dialog/base.dialog";
import { TitleDialogElement } from "../components/title_dialog_element.component";
import "./new_procedure.dialog.css";
import { createOptions } from "../../../../business_logic/utils";
import { createNewProcedure } from "../../../../business_logic/network.repository";
import { Procedure } from "../../../../models/procedure.model";
import { useSelector } from "react-redux";
import { selectConstants } from "../../../../store/store";

export function NewProcedureDialog({
  saveStatusCallback,
  onCancelClick,
}) {
  const data = useSelector(selectConstants)

  var procedureName = "";
  var procedureType = 1;

  return (
    <BaseDialog
      actions={() => {
        return (
          <button className="secondaryButton" onClick={onCancelClick}>
            Annulla
          </button>
        );
      }}
      onSaveButton={() => {
        if (procedureName.length !== 0) {
          const procedure = new Procedure();
          procedure.name = procedureName;
          procedure.procedureTypeId = procedureType;

          createNewProcedure(procedure, () => {
            onCancelClick();
          });
        }
      }}
    >
      <TitleDialogElement
        id="procedure_name"
        title="Inserisci il nome della nuova procedura"
      >
        <input
          type="text"
          placeholder="Nuova procedura"
          onChange={(e) => {
            procedureName = e.target.value;
          }}
        />
      </TitleDialogElement>
      <TitleDialogElement
        id="procedure_type"
        title="Di che tipo è la procedura"
      >
        {createOptions(data.procedureTypes, "procedureTypesSelector", (e) => {
          procedureType = e.target.value;
        })}
      </TitleDialogElement>
    </BaseDialog>
  );
}
