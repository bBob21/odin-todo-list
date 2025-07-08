import { Project } from "./project.js";
import { Todo } from "./todo.js";

export function createEventSidebar(projectList) {
  const newProjectDialog = document.querySelector(".newProjectDialog");
  const newProjectBtn = document.querySelector(".newProjectBtn");
  const newProjectDialogSave = document.querySelector("#npSave");
  const newProjectDialogCancel = document.querySelector("#npCancel");

  newProjectBtn.addEventListener("click", () => {
    document.querySelectorAll(".newProjectDialog input").forEach((i) => {
      i.value = "";
    });
    newProjectDialog.showModal();
  });
  newProjectDialogSave.addEventListener("click", () => {
    let newProject = new Project(document.querySelector("#npName").value);
    projectList.push(newProject);
    renderSideBar(projectList);
  });
  newProjectDialogCancel.addEventListener("click", () => {
    newProjectDialog.close();
  });
}

function renderSidebar(projectList) {
  const sidebar = document.querySelector(".sidebar");
  const projectContainer = document.querySelector(".projectContainer");
  projectContainer.innerHTML = "";
  projectList.forEach((p) => {
    let project = document.createElement("li");
    let projectBtn = document.createElement("button");
    projectBtn.textContent = p.name;
    projectBtn.addEventListener("click", () => {
      renderInnerMain(p);
    });
    project.appendChild(projectBtn);
    projectContainer.appendChild(project);
  });

  sidebar.appendChild(projectContainer);
}

function renderInnerMain(currProject) {
  const todoContainer = document.querySelector(".todoContainer");
  todoContainer.innerHTML = "";
  currProject.getTodoList.forEach((t) => {
    let todo = document.createElement("div");
    todo.textContent = t.title;
    todoContainer.appendChild(todo);
  });
  const newTodoBtn = document.createElement("button");
  newTodoBtn.textContent = "New Todo";
}

export function createNewTodo(currProject) {
  const newTodoDialog = document.querySelector(".newTodoDialog");
  const newTodoBtn = document.querySelector(".newTodoBtn");
  const newTodoDialogSave = document.querySelector("#ntSave");
  const newTodoDialogCancel = document.querySelector("#ntCancel");

  newTodoBtn.addEventListener("click", () => {
    document.querySelectorAll(".newTodoDialog input").forEach((i) => {
      i.value = "";
    });
    document.querySelector(".newTodoDialog select").value = "";
    newTodoDialog.showModal();
  });
  newTodoDialogSave.addEventListener("click", () => {
    let title = document.querySelector("#ntTitle").value;
    let dueDate = document.querySelector("#ntDueDate").value;
    let priority = document.querySelector("#ntPriority").value;
    let description = document.querySelector("#ntDescription").value;

    let newTodo = new Todo(title, dueDate, priority, description);
    currProject.addTodo(newTodo);
    renderInnerMain(currProject);
  });
  newTodoDialogCancel.addEventListener("click", () => {
    newTodoDialog.close();
  });
}

export function render(projectList, currProject) {
  renderSidebar(projectList);
  renderInnerMain(currProject);
}
