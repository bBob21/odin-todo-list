import "./styles.css";
import {Todo} from "./todo.js";
import {Project} from "./project.js";

console.log("Hello World");

const todo1 = new Todo("todoTitle", "01/01/2026");
const project1 = new Project("ProJect_Name");
project1.addTodo(todo1);
console.log(project1.getTodoList)