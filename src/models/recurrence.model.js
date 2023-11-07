export default class Recurrence {
    constructor(uid, name) {
      this.uid = uid;
      this.name = name;
    }
  
    static fromJson(map) {
      return new Recurrence(map['uid'], map['name']);
    }
  
    toJson() {
      return {
        uid: this.uid,
        name: this.name,
      };
    }
  }
  
  