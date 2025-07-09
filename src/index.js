import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { createNewProjectDialog, createNewTodoDialog, setCurrProject, render } from "./render.js";
import { appState } from "./appState.js";

window.appState = appState;
let storageCheck = appState.loadLocalStorage()
if (!storageCheck){
  const projectList = []
  const project1 = new Project("House Things")
  const todo1 = new Todo("Clean Up Room", "2025-07-20", 1, "Maybe buy vacuum");
  const todo2 = new Todo("Groceries", "2025-07-10", 3, "Milk, Bread, Chicken, MSG, Oil, Spinach, Potatoes");
  const todo3 = new Todo("Fix TV", "2025-08-01", 1, "Probably hire someone else");
  project1.addTodo(todo1);
  project1.addTodo(todo2);
  project1.addTodo(todo3);

  const project2 = new Project("The Odin Project");
  const todo4 = new Todo("Code Todo list app", "2025-07-09", 2, "Create JS application to keep track of Todos grouped by Projects")
  project2.addTodo(todo4);
  projectList.push(project1, project2);
  appState.currProjectID = projectList[0].id;
  appState.projectList = projectList;
}

createNewProjectDialog(appState);
createNewTodoDialog(appState);
render(appState);
