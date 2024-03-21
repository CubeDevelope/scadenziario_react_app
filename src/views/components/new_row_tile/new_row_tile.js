import "./new_row_tile.css";
import { dialogSlice } from "../../../store/slices/dialog.slice";
import {
  DropdownButton,
  DropdownElement,
} from "../dropdown_button/dropdown_button";

export default function NewRowTile({
  isArchive,
  onHistoryPressed,
  className,
  dispatch,
}) {
  return (
    <div id="new_row_tile" className={className}>
      <DropdownButton title="Crea nuovo" >
        <DropdownElement
          onSelected={() => {
            dispatch(dialogSlice.actions.createActivity());
          }}
        >
          Attività
        </DropdownElement>
        <DropdownElement
          onSelected={() => {
            dispatch(dialogSlice.actions.createProcedure());
          }}
        >
          Procedura
        </DropdownElement>
        <DropdownElement
          onSelected={() => {
            dispatch(dialogSlice.actions.createOperator());
          }}
        >
          Operatore
        </DropdownElement>
      </DropdownButton>
      <button
        className="secondaryButton"
        onClick={() => {
          dispatch(dialogSlice.actions.hideNewElement())
          if (onHistoryPressed != null) onHistoryPressed(!isArchive);
        }}
      >
        {!isArchive ? "Attività aperte" : "Archivio attività"}
      </button>
    </div>
  );
  return (
    <div id="new_row_tile" className={className}>
      <div>
        <button
          id="new_row_button"
          className="primaryButton"
          onClick={() => {
            dispatch(dialogSlice.actions.createActivity());
          }}
        >
          Inserisci nuova attività
        </button>
        <button
          className="secondaryButton"
          onClick={() => {
            dispatch(dialogSlice.actions.createProcedure());
          }}
        >
          Inserisci nuova procedura
        </button>
        <button
          className="secondaryButton"
          onClick={() => {
            dispatch(dialogSlice.actions.createOperator());
          }}
        >
          Inserisci nuovo operatore
        </button>
      </div>
      <button
        className="secondaryButton"
        onClick={() => {
          if (onHistoryPressed != null) onHistoryPressed(!isArchive);
        }}
      >
        {!isArchive ? "Attività aperte" : "Archivio attività"}
      </button>
    </div>
  );
}
