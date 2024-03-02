export const formattingOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export const dateFormatter = Intl.DateTimeFormat("it-IT", formattingOptions);

//export const baseUrl = "http://192.168.14.4:5000"; //TODO
export const baseUrl = "http://localhost:5000"; //TODO

export const createOptions = (data, id, onChange) => {
  const options = [];

  data.forEach((element) => {
    options.push(<option value={element.uid}>{element.name}</option>);
  });

  return (
    <select id={id} onChange={onChange}>
      {options}
    </select>
  );
};

export function findElementInList(list, id, onChange) {
  if (list.length !== 0) {
    const find = list.find((e) => {
      return e.uid === parseInt(id);
    });

    return find.name;
  }

  return "";
}

export function sanityzeText(text) {
  return text.replace("$sap","'")
}

export const SortType = {
  date: "date",
  procedure: "procedure",
  deadline: "deadline",
  recurrence: "recurrence",
  operator: "operator",
  state: "state",
  urgency: "urgency",
};

export const SortSubtype = {
  dateUp: "dateUp",
  dateDown: "dateDown",
  procedureUp: "procedureUp",
  procedureDown: "procedureDown",
  deadlineUp: "deadlineUp",
  deadlineDown: "deadlineDown",
  recurrenceUp: "recurrenceUp",
  recurrenceDown: "recurrenceDown",
  operatorUp: "operatorUp",
  operatorDown: "operatorDown",
  stateUp: "stateUp",
  stateDown: "stateDown",
  urgencyUp: "urgencyUp",
  urgencyDown: "urgencyDown",
};
