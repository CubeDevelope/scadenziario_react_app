import { useContext } from "react";
import "./new_row_tile.css";
import {
  ShowDialogContext,
} from "../../../business_logic/context/app_context";
import {
  CreateActivityDialogState,
  CreateOperatorDialogState,
  CreateProcedureDialogState,
} from "../dialogs/dialog_states";

export default function NewRowTile({ isArchive, onHistoryPressed, className }) {
  const dialogContext = useContext(ShowDialogContext);

  return (
    <div id="new_row_tile" className={className}>
      <div>
        <button
          id="new_row_button"
          className="primaryButton"
          onClick={() => {
            dialogContext(new CreateActivityDialogState());
          }}
        >
          Inserisci nuova attività
        </button>
        <button
          className="secondaryButton"
          onClick={() => {
            dialogContext(new CreateProcedureDialogState());
          }}
        >
          Inserisci nuova procedura
        </button>
        <button
          className="secondaryButton"
          onClick={() => {
            dialogContext(new CreateOperatorDialogState());
          }}
        >
          Inserisci nuovo operatore
        </button>
      </div>
      <button
        className="secondaryButton"
        onClick={() => {
          onHistoryPressed?.call();
        }}
      >
        {!isArchive ? "Attività aperte" : "Archivio attività"}
      </button>
    </div>
  );
}
