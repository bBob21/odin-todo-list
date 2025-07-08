import {parse} from "date-fns";

export class Todo {
    constructor(title, dueDate, priority, description){
        this._id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.completion = false;
    }
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    set title(t){
        if (t == "")
            throw new Error("Todo has an invalid title");
        this._title = t;
    }
    get description(){
        return this._description;
    }
    set description(d){
        this._description = d;
    }
    get dueDate(){
        return this._dueDate;
    }
    set dueDate(dd){
        this._dueDate = parse(dd, "dd/MM/yyyy", new Date());
    }
    get priority(){
        return this._priority;
    }
    set priority(p){
        this._priority = p;
    }
    get completion(){
        return this._completion;
    }
    set completion(c){
        this._completion = c;
    }
}