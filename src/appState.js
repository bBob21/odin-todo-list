import { parse } from "date-fns";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

class AppState {
  constructor(currProjectID){
    this._currProjectID = currProjectID;
    this._projectList = [];
  }
  get currProjectID(){
    return this._currProjectID;
  }
  set currProjectID(id){
    this._currProjectID = id;
  }
  get projectList(){
    return this._projectList;
  }
  set projectList(projects){
    this._projectList = projects;
  }
  getCurrProject(){
    return this.projectList.find(p => p.id === this.currProjectID);
  }
  loadLocalStorage(){
    let data = localStorage.getItem("projectList")
    if (!data){
      console.log("LOAD FAIL")
      return false;
    }
    console.log("LOAD SUC")
    this.currProjectID = localStorage.getItem("currProjectID");
    this.projectList = JSON.parse(data).map((project) => {
      const newProject = new Project(project.name, project.id);
      newProject.todoList = project.todoList.map((todo) => {
        const newTodo = new Todo(
          todo.title,
          todo.dueDate,
          todo.priority,
          todo.description,
          todo.completion,
          todo.id
        );
        console.log("TODO")
        console.log(newTodo)
        return newTodo;
      });
      console.log("PROJECT")
      console.log(newProject)
      return newProject;
    });
    return true;
  }
  saveLocalStorage(){
      localStorage.setItem(
        "projectList",
        JSON.stringify(this.projectList.map((p) => p.toJSON()))
      );
      localStorage.setItem(
        "currProjectID",
        this.currProjectID
      );
  }
}

const appState = new AppState();
export { appState };