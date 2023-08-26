import { useContext } from "react";
import "./table_row.css";
import AppContext from "../../../business_logic/context/app_context";

export function TableRow({ activity }) {
  const data = useContext(AppContext);

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

  function createUrgencyTitle() {
    const tdClassed = "";

    if(Date.now - activity.deadline )

    return <td className={tdClassed}></td>;
  }

  return (
    <tr>
      <td>{activity.date}</td>
      <td>{activity.name}</td>
      <td>{activity.ordinary != "" ? activity.ordinary : activity.other}</td>
      <td>{activity.deadline}</td>
      <td>{activity.operator}</td>
      <td>{createOptions(data["activityStates"], "activityStatesSelector")}</td>
      <td>{activity.notes}</td>
      <td></td>
    </tr>
  );
}

export function TableHeader() {
  return (
    <tr>
      <th>Data</th>
      <th>Nome procedura</th>
      <th>Attività</th>
      <th>Scadenza</th>
      <th>Operatore</th>
      <th>Stato avanzamento</th>
      <th>Note</th>
      <th>Urgenza</th>
    </tr>
  );
}
