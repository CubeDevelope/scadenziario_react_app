export default class Activity {
  /*
    uid : int
    creationDate : Date
    procedureId : int
    recurrenceId : int | null
    alternativeName : string | null
    deadline: Date
    stateId : int
    note : string
  */

  constructor(
    uid,
    creationDate,
    procedureId,
    recurrenceId,
    alternativeName,
    deadline,
    operatorId,
    stateId,
    notes
  ) {
    this.uid = uid;
    this.creationDate = creationDate ?? Date.now();
    this.procedureId = procedureId ?? 1;
    this.recurrenceId = recurrenceId ?? 1;
    this.alternativeName = alternativeName ?? null;
    this.deadline = deadline ?? Date.now();
    this.operatorId = operatorId ?? 1;
    this.stateId = stateId ?? 1;
    this.notes = notes ?? "";
  }


  static fromJson(map) {
    return new Activity(
      map["uid"],
      new Date(parseInt(map["creationDate"])),
      map["procedureId"],
      map["recurrenceId"],
      map["alternativeName"],
      new Date(parseInt(map["deadline"])),
      map["operatorId"],
      map["stateId"],
      map["notes"]
    );
  }

  toJson() {
    return {
      uid: this.uid,
      creationDate: this.creationDate.getTime(),
      procedureId: this.procedureId,
      recurrenceId: this.recurrenceId,
      alternativeName: this.alternativeName,
      deadline: this.deadline.getTime(),
      operatorId: this.operatorId,
      stateId: this.stateId,
      notes: this.notes,
    };
  }
}
