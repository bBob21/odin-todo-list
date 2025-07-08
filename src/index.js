import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { createEventSidebar, render } from "./render.js";

const projectList = [];
window.projectList = projectList;

const todo1 = new Todo("todoTitle", "01/01/2026");
const todo2 = new Todo("secondDoing", "01/03/2024");
const todo3 = new Todo("thirdTo", "10/11/2020");
const todo4 = new Todo("444444d", "12/12/2012");
const project1 = new Project("ProJect_Name");
project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);
project1.addTodo(todo4);

const project2 = new Project("name2pRoject2");

projectList.push(project1, project2);
createEventSidebar(projectList);
render(projectList, projectList[0]);