export function TableRow({activity}) {
    
  return <tr>
    <td>{activity.date}</td>
    <td>{activity.name}</td>
    <td>{activity.ordinary}</td>
    <td>{activity.other}</td>
    <td>{activity.deadline}</td>
    <td>{activity.operator}</td>
    <td>{activity.progress}</td>
    <td>{activity.notes}</td>
    <td>{activity.urgency}</td>
  </tr>;
}

export function TableHeader() {
  return (
    <tr>
      <th>Data</th>
      <th>Nome procedura</th>
      <th>Attività ordinaria</th>
      <th>Altre attività</th>
      <th>Scadenza</th>
      <th>Operatore</th>
      <th>Stato avanzamento</th>
      <th>Note</th>
      <th>Urgenza</th>
    </tr>
  );
}
