import { BaseDialog } from "../base_dialog/base.dialog";

export function ServerErrorDialog({ confirmCallback }) {
  return (
    <BaseDialog onSaveButton={confirmCallback} title="Errore">

    </BaseDialog>
  );
}
