export class Activity {
  constructor(
    date,
    name,
    ordinary,
    other,
    deadline,
    operator,
    progress,
    notes,
    urgency
  ) {
    this.date = date;
    this.name = name;
    this.ordinary = ordinary;
    this.other = other;
    this.deadline = deadline;
    this.operator = operator;
    this.progress = progress;
    this.notes = notes;
    this.urgency = urgency;
  }
}
