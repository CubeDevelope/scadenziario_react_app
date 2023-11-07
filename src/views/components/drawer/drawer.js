import { ListTile } from "../list_tile/list.tile";

import "./drawer.css";

export function Drawer({ isVisible, changeTable }) {
  return (
    <div id="drawer" className={isVisible ? "drawerOpened" : "drawerClosed"}>
      <ListTile
        onTap={() => {
          changeTable(0);
        }}
        title={"Home"}
        leading={<span class="material-symbols-outlined">home</span>}
      />
      <ListTile
        onTap={() => {
          changeTable(2);
        }}
        title={"Operatori"}
        leading={<span class="material-symbols-outlined">home</span>}
      />
      <ListTile
        title={"Procedure"}
        onTap={() => {
          changeTable(3);
        }}
        leading={<span class="material-symbols-outlined">home</span>}
      />
    </div>
  );
}
