import Activity from "../models/activity.model";
import ActivityState from "../models/activity_state.model";
import Operator from "../models/operator.model";
import { Procedure } from "../models/procedure.model";
import { ProcedureType } from "../models/procedure_type.model";
import Recurrence from "../models/recurrence.model";
import { baseUrl } from "./utils";

export const getActiviesFromBE = async (callback) => {
  var activities = [];
  const data = await fetch(baseUrl + "/getActivities").catch((err) => {
    callback(activities, err);
    throw err;
  });

  data
    .json()
    .then((result) => {
      activities = result["activities"].map((element) => {
        return Activity.fromJson(element);
      });
      callback(activities, null);
    })
    .catch((err) => {
      callback(activities, err);
      throw err;
    });
};

export const getProcedures = async (callback) => {
  const procedures = [];
  const data = await fetch(baseUrl + "/getProcedures").catch((err) => {
    throw err;
  });

  data
    .json()
    .then((result) => {
      result["procedures"].forEach((element) => {
        procedures.push(Procedure.fromJson(element));
      });
      callback(procedures, null);
    })
    .catch((err) => {
      callback(procedures, err);
      throw err;
    });
};

export const getOperators = async (callback) => {
  var operators = [];
  const data = await fetch(baseUrl + "/getOperators").catch((err) => {
    throw err;
  });

  data
    .json()
    .then((result) => {
      operators = result["operators"].map((element) => {
        return Operator.fromJson(element);
      });
      callback(operators);
    })
    .catch((err) => {
      throw err;
    });
};

export const getConstantValues = async (callback) => {
  const data = await fetch(baseUrl + "/getConstantValues").catch((err) => {
    callback({}, err);
    throw err;
  });
  data
    .json()
    .then((result) => {
      const map = {};

      map["operators"] = result["operators"].map((element) => {
        return Operator.fromJson(element);
      });
      map["procedures"] = result["procedures"].map((element) => {
        return Procedure.fromJson(element);
      });
      map["activityStates"] = result["activityStates"].map((element) => {
        return ActivityState.fromJson(element);
      });
      map["recurrence"] = result["recurrence"].map((element) => {
        return Recurrence.fromJson(element);
      });
      map["procedureTypes"] = result["procedureTypes"].map((element) => {
        return ProcedureType.fromJson(element);
      });

      callback(map, null);
    })
    .catch((err) => {
      callback({}, err);
      throw err;
    });
};

export const createNewActivity = (activity) => {
  fetch(baseUrl + "/createNewActivity", {
    mode: "cors",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
};

export const createNewProcedure = async (procedure, callback) => {
  const data = await defaultCall(
    "/createNewProcedure",
    procedure.toJson(),
    "post"
  );
  callback(data);
};

export const createNewOperator = async (operator, callback) => {
  const data = await defaultCall(
    "/createNewOperator",
    operator.toJson(),
    "post"
  );
  callback(data);
};

export const updateActivity = async (activity, callback) => {
  const data = await defaultCall("/updateActivity", activity.toJson(), "put");
  callback?.call(data);
};

export const deleteActivity = (activityId) => {
  fetch(baseUrl + "/deleteActivity", {
    mode: "cors",
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: activityId }),
  });
};

export const deleteOperator = (operatorId) => {
  fetch(baseUrl + "/deleteOperator", {
    mode: "cors",
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: operatorId }),
  });
};

export const deleteProcedure = (procedureId) => {
  fetch(baseUrl + "/deleteProcedure", {
    mode: "cors",
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: procedureId }),
  });
};

const defaultCall = async (url, data, callType) => {
  await fetch(baseUrl + url, {
    mode: "cors",
    method: callType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
