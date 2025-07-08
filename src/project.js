export class Project {
  constructor(name) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._todoList = [];
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  set name(n) {
    if (n == "") throw new Error("Project has an invalid name");
    this._name = this.name;
  }
  get getTodoList() {
    return this._todoList;
  }
  addTodo(todo) {
    return this._todoList.push(todo);
  }
  removeTodo(todo) {
    this._todoList = this.getTodoList.filter((t) => {
       return t.id !== todo.id;
    });
  }
}
