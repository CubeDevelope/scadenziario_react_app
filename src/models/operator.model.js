class Operator {
  constructor(uid, name) {
    this.name = name;
    this.uid = uid;
  }

  static fromJson(map) {
    return new Operator(map["uid"], map["name"]);
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
    };
  }
}

module.exports = Operator;
