import { useContext } from "react";
import {
  dateFormatter,
  findElementInList,
} from "../../../../business_logic/utils";
import { TableHeader } from "../../table/headers/table.header";
import { TableRow } from "../../table/rows/table.row";
import Table from "../../table/table";
import { BaseDialog } from "../base_dialog/base.dialog";
import { AppContext } from "../../../../business_logic/context/app_context";
import { useSelector } from "react-redux";
import { selectConstants } from "../../../../store/store";

export function UrgencyDialog({ confirmCallback, activities = [] }) {
  const data = useSelector(selectConstants);

  return (
    <BaseDialog
      onSaveButton={confirmCallback}
      buttonTitle="Chiudi"
      title="Urgenza"
    >
      <Table
        activities={activities}
        header={
          <TableHeader>
            {["Nome procedura", "Attività", "Scadenza", "Operatore"].map(
              (header) => {
                return <th>{header}</th>;
              }
            )}
          </TableHeader>
        }
      >
        {activities.map((act) => {
          return (
            <TableRow className={activities.indexOf(act) % 2 && "grey-row"}>
              <td>{findElementInList(data.procedures, act.procedureId)}</td>
              <td>
                {act.alternativeName ??
                  findElementInList(data.recurrence, act.recurrenceId)}
              </td>
              <td>{dateFormatter.format(act.deadline)}</td>
              <td>{findElementInList(data.operators, act.operatorId)}</td>
            </TableRow>
          );
        })}
      </Table>
    </BaseDialog>
  );
}
