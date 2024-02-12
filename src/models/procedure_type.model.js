export class ProcedureType {
  constructor(uid, name, acronym) {
    this.uid = uid;
    this.name = name;
    this.acronym = acronym;
  }

  static fromJson(map) {
    return new ProcedureType(map["uid"], map["name"], map["acronym"]);
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      acronym: this.acronym,
    };
  }
}

