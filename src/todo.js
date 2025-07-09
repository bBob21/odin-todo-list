import { parse, format } from "date-fns";

export class Todo {
  constructor(title, dueDate, priority, description, completion = false, id = crypto.randomUUID()) {
    this._id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    if (description == undefined) description = "";
    this.description = description;
    this.completion = completion;
  }
  
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get title() {
    return this._title;
  }
  set title(t) {
    if (t == "") throw new Error("Todo has an invalid title");
    this._title = t;
  }
  get description() {
    return this._description;
  }
  set description(d) {
    this._description = d;
  }
  get dueDate() {
    return this._dueDate;
  }
  set dueDate(dd) {
    this._dueDate = parse(dd, "yyyy-MM-dd", new Date());
  }
  get priority() {
    return this._priority;
  }
  set priority(p) {
    this._priority = p;
  }
  get completion() {
    return this._completion;
  }
  set completion(c) {
    this._completion = c;
  }
  toJSON(){
    return{
      id: this.id,
      title: this.title,
      dueDate: format(this.dueDate, "yyyy-MM-dd"),
      priority: this.priority,
      description: this.description,
      completion: this.completion
   }
  }
}
