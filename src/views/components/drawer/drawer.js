import { useNavigate, useRoutes } from "react-router-dom";
import { ListTile } from "../list_tile/list.tile";

import "./drawer.css";
import { dialogSlice } from "../../../store/slices/dialog.slice";

export function Drawer({ isVisible, dispatch }) {
  const router = useNavigate();

  return (
    <div id="drawer" className={isVisible ? "drawerOpened" : "drawerClosed"}>
      <ListTile
        onTap={() => {
          router("/activities");
          dispatch(dialogSlice.actions.hideAll());
        }}
        title={"Home"}
        leading={<span className="material-symbols-outlined">home</span>}
      />
      <ListTile
        onTap={() => {
          router("/operators");
          dispatch(dialogSlice.actions.hideAll());
        }}
        title={"Operatori"}
        leading={<span className="material-symbols-outlined">home</span>}
      />
      <ListTile
        title={"Procedure"}
        onTap={() => {
          router("/procedures");
          dispatch(dialogSlice.actions.hideAll());
        }}
        leading={<span className="material-symbols-outlined">home</span>}
      />
      <ListTile
        title={"Attività standard"}
        onTap={() => {
          router("/recurrence");
          dispatch(dialogSlice.actions.hideAll());
        }}
        leading={<span className="material-symbols-outlined">home</span>}
      />
    </div>
  );
}
