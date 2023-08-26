class Procedure {
  constructor(uid, name) {
    this.uid = uid;
    this.name = name;
  }

  static fromJson(map) {
    return new Procedure(map["uid"], map["name"]);
  }
}

module.exports = Procedure;
