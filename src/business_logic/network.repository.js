import Activity from "../models/activity.model";
import Operator from "../models/operator.model";
import { Procedure } from "../models/procedure.model";
import { baseUrl } from "./utils";

export const getActiviesFromBE = async (callback) => {
  const activities = [];
  const data = await fetch(baseUrl + "/getActivities").catch((err) => {
    callback(activities, err);
    throw err;
  });

  data
    .json()
    .then((result) => {
      result["activities"].forEach((element) => {
        activities.push(Activity.fromJson(element));
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
    callback(procedures, err);
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
  const operators = [];
  const data = await fetch(baseUrl + "/getOperators").catch((err) => {
    callback(operators, err);
    throw err;
  });

  data
    .json()
    .then((result) => {
      result["operators"].forEach((element) => {
        operators.push(Operator.fromJson(element));
      });
      callback(operators, null);
    })
    .catch((err) => {
      callback(operators, err);
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
