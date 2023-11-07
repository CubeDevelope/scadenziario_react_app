export class Procedure {
  constructor(uid, name, procedureTypeId) {
    this.uid = uid;
    this.name = name;
    this.procedureTypeId = procedureTypeId;
  }

  static fromJson(map) {
    return new Procedure(map["uid"], map["name"], map["procedureTypeId"]);
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      procedureTypeId: this.procedureTypeId,
    };
  }
}

