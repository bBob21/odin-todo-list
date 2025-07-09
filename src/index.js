import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { createNewProjectDialog, createNewTodoDialog, setCurrProject, render } from "./render.js";
import { appState } from "./appState.js";

const projectList = [];
window.projectList = projectList;

const todo1 = new Todo("todoTitle", "2026-01-01",2);
const todo2 = new Todo("secondDoing", "2024-03-01",1, "long ddescription abt the todo");
const todo3 = new Todo("thirdTo", "2020-11-10",3, "dsescdesc");
const todo4 = new Todo("444444d", "2012-12-12",3);
const project1 = new Project("ProJect_Name");
project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);

const project2 = new Project("name2pRoject2");
project2.addTodo(todo4);
projectList.push(project1, project2);

appState.currProjectID = projectList[0].id;
appState.projectList = projectList;
console.log(appState)
createNewProjectDialog(appState);
createNewTodoDialog(appState);
render(appState);
