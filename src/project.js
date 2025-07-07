class Project {
    constructor(name){
        this._name = name;
        this._todoList = [];
    }
    get name(){
        return this._name;
    }
    set name(n){
        this._name = this.name;
    }
    get getTodoList(){
        return this._todoList;
    }
    set addTodo(todo){
        return this._todoList.push(todo);
    }
    set removeTodo(todo){
        this._todoList = this.getTodoList.filter((t) => {
            t.id !== todo.id;
        });
    }
}