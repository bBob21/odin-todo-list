class Todo {
    constructor(title, description, dueDate, priority){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }
    get title(){
        return this._title;
    }
    set title(t){
        this._title = t;
    }
    get description(){
        return this.description;
    }
    set description(d){
        this._description = d;
    }
    get dueDate(){
        return this._dueDate;
    }
    set dueDate(dd){
        this._dueDate = dd;
    }
    
    get priority(){
        return this._priority;
    }
    set priority(p){
        this._priority = p;
    }
}

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
    get showTodoList(){
        return this._todoList;
    }
    set addTodo(todo){
        return this._todoList.push(todo);
    }
    set removeTodo(todo){
        let curr;
        for(let i = 0; i < this._todoList.length; i++){
            curr = this._todoList[i];
            if (curr == todo){ // check if this is working
                this._todoList.splice(i, 1);
                break;
            }
        }
    }
}