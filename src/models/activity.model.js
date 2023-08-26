export default class Activity {
  constructor(
    date,
    name,
    ordinary,
    other,
    deadline,
    operator,
    progress,
    notes,
  ) {
    this.date = date;
    this.name = name;
    this.ordinary = ordinary;
    this.other = other;
    this.deadline = deadline;
    this.operator = operator;
    this.progress = progress;
    this.notes = notes;
  }
}
