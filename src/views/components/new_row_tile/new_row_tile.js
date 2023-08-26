import { useEffect, useState } from "react";
import "./new_row_tile.css";
import { NewRowDialog } from "../dialogs/new_row_dialog";

export default function NewRowTile({ onPressed }) {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    const dialog = document.getElementById("insertRowDialog");

    if (visible) {
      dialog.classList.remove("notVisible");
    } else {
      dialog.classList.add("notVisible");
    }
  }, [visible]);

  return (
    <div>
      <div id="new_row_tile">
        <button
          id="new_row_button"
          onClick={() => {
            setVisibility(true);
          }}
        >
          Aggiungi riga
        </button>
      </div>
      <NewRowDialog
        confermCallback={(activity) => {
          onPressed(activity);
          setVisibility(false);
        }}
        callback={() => {
          setVisibility(false);
        }}
      />
    </div>
  );
}
