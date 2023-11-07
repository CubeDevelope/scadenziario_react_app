
class DialogState {}

class EditDialogState extends DialogState {
  constructor(elementToEdit, callback) {
    super();
    this.elementToEdit = elementToEdit;
    this.callback = callback;
  }
}

class CreateDialogState extends DialogState {
  constructor(callback) {
    super();
    this.callback = callback;
  }
}

export class UrgencyDialogState extends DialogState {}

export class DeleteDialogState extends DialogState {
  constructor(callback) {
    super();
    this.code = "Elimina";
    this.description = "Sei sicuro di voler eliminare questo elemento?";
    this.callback = callback;
  }
}

export class EditActivityDialogState extends EditDialogState {
  constructor(activityToEdit) {
    super(activityToEdit, (activity) => {
        console.log(activity);
    });
  }
}

export class CreateActivityDialogState extends CreateDialogState {
  
}
export class CreateProcedureDialogState extends CreateDialogState {}

export class CreateOperatorDialogState extends CreateDialogState {}


export class EditOperatorDialogState extends EditDialogState {
  constructor(operatorToEdit) {
    super(operatorToEdit, (activity) => {
        console.log(activity);
    });
  }
}