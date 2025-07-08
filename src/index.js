import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { createEventSidebar, render } from "./render.js";

const projectList = [];
window.projectList = projectList;

const todo1 = new Todo("todoTitle", "01/01/2026");
const project1 = new Project("ProJect_Name");
project1.addTodo(todo1);
const project2 = new Project("name2pRoject2");

projectList.push(project1, project2);
createEventSidebar(projectList);
render(projectList);
