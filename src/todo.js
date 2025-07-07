class Todo {
    constructor(title, description, dueDate, priority){
        this._id = crypto.randomUUID;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }
    get id(){
        return this._id;
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