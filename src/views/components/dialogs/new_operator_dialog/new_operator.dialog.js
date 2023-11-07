import { createNewOperator } from "../../../../business_logic/network.repository";
import Operator from "../../../../models/operator.model";
import { BaseDialog } from "../base_dialog/base.dialog";
import { TitleDialogElement } from "../components/title_dialog_element.component";
import "./new_operator.dialog.css";

export function NewOperatorDialog({ confermCallback, saveStatusCallback }) {
  var operatorName = "";

  return (
    <BaseDialog
      onConfirmCallback={confermCallback}
      onSaveButton={async () => {
        if (operatorName.length !== 0) {
          const operator = new Operator();
          operator.name = operatorName;

          createNewOperator(operator, () => {
            saveStatusCallback?.call();
          });
        }
      }}
    >
      <TitleDialogElement title="Inserisci il nome del nuovo operatore">
        <input
          type="text"
          placeholder="Nome dell'operatore"
          onChange={(e) => {
            operatorName = e.target.value;
          }}
        />
      </TitleDialogElement>
    </BaseDialog>
  );
}
