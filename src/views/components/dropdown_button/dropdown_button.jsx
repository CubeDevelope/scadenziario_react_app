import "./dropdown_button.css";

import { useDispatch, useSelector } from "react-redux";
import { selectDialog } from "../../../store/store";
import { dialogSlice } from "../../../store/slices/dialog.slice";

export function DropdownButton({ children, title }) {
  const dispatch = useDispatch();
  const dialogSelector = useSelector(selectDialog);

  return (
    <div className="dd-wrapper">
      <button
        className="primaryButton"
        onClick={() => {
          if (dialogSelector.newElementVisible)
            dispatch(dialogSlice.actions.hideNewElement());
          else dispatch(dialogSlice.actions.openNewElement());
        }}
      >
        {title}
      </button>
      {dialogSelector.newElementVisible && (
        <div className="dd-menu">{children}</div>
      )}
    </div>
  );
}

export function DropdownElement({ children, onSelected }) {
  return (
    <div className="dd-element" onClick={onSelected}>
      {children}
    </div>
  );
}
