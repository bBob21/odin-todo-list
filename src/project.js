export class Project {
  constructor(name, id = crypto.randomUUID()) {
    this._id = id;
    this._name = name;
    this._todoList = [];
  }

  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get name() {
    return this._name;
  }
  set name(n) {
    if (n == "") throw new Error("Project has an invalid name");
    this._name = n;
  }
  get todoList() {
    return this._todoList;
  }
  set todoList(tdl){
    this._todoList = tdl;
  }
  addTodo(todo) {
    return this._todoList.push(todo);
  }
  removeTodo(todo) {
    this._todoList = this.todoList.filter((t) => {
       return t.id !== todo.id;
    });
  }
  toJSON(){
    return {
      id: this.id,
      name: this.name,
      todoList: this.todoList.map((t) => t.toJSON())
    }
  }
}
