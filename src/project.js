export class Project {
    constructor(name){
        this._name = name;
        this._todoList = [];
    }
    get name(){
        return this._name;
    }
    set name(n){
        if (n == "")
            throw new Error("Project has an invalid name");
        this._name = this.name;
    }
    get getTodoList(){
        return this._todoList;
    }
    addTodo(todo){
        return this._todoList.push(todo);
    }
    removeTodo(todo){
        this._todoList = this.getTodoList.filter((t) => {
            t.id !== todo.id;
        });
    }
}