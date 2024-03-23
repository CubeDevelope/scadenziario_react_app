import { dialogSlice } from "../../../store/slices/dialog.slice";
import { selectDialog } from "../../../store/store";
import "./table.css";
import { useDispatch, useSelector } from "react-redux";

export default function Table({ children, header }) {
  const dispatch = useDispatch();
  const dialogSelector = useSelector(selectDialog);
  return (
    <table
      onClick={() => {
        if (dialogSelector.newElementVisible)
          dispatch(dialogSlice.actions.hideAll());
      }}
    >
      <thead>{header}</thead>

      <tbody>{children}</tbody>
    </table>
  );
}
