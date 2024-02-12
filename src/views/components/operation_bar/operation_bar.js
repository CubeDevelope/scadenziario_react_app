import "./operation_bar.css";

export default function OperationBar({visible = false}) {
  return <div id="operation_bar" className={visible ? "showBar": "hideBar" }>
    <button className="secondaryButton">
        Archivia attività
    </button>

    <button className="errorButton">
        Elimina attività
    </button>
  </div>;
}
