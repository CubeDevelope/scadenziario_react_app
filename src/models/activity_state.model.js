export default class ActivityState {
    constructor(uid, name) {
      this.uid = uid;
      this.name = name;
    }
  
    static fromJson(map) {
      return new ActivityState(map["uid"], map["name"]);
    }
  
    toJson() {
      return {
        uid: this.uid,
        name: this.name,
      };
    }
  }
  

  