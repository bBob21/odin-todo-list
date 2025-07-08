import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { format, parse } from "date-fns";

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
    let todoBox = document.createElement("div");
    todoBox.classList.add("todoBox");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = t.id;
    
    let label = document.createElement("label");
    label.htmlFor = t.id;

    let todoCard = document.createElement("div");
    todoCard.textContent = t.title + " " + format(t.dueDate, "dd MMM, yyyy - HH:mm");
    label.appendChild(todoCard);

    let showTodoDialogBtn = document.createElement("button");
    showTodoDialogBtn.textContent = "Show";
    showTodoDialogBtn.addEventListener("click", () => {
      showTodoDialog(currProject, t);
    })
    todoBox.append(checkbox, label, showTodoDialogBtn)
    todoContainer.appendChild(todoBox);
  });
  const newTodoBtn = document.createElement("button");
  newTodoBtn.textContent = "New Todo";
}

function showTodoDialog(currProject, todo){
  const todoDialog = document.querySelector(".todoDialog");
  const todoDialogUpdate = document.querySelector("#tUpdate");
  const todoDialogCancel = document.querySelector("#tCancel");
  const todoDialogDelete = document.querySelector("#tDelete")
  const title = document.querySelector("#tTitle");
  const dueDate = document.querySelector("#tDueDate");
  const priority = document.querySelector("#tPriority");
  const completion = document.querySelector("#tCompletion");
  const description = document.querySelector("#tDescription");
  title.value = todo.title;
  dueDate.value = format(todo.dueDate, "yyyy-MM-dd");
  priority.value = todo.priority;
  if (todo.completion) completion.checked = true;
  description.value = todo.description;

  todoDialogCancel.addEventListener("click", () => {
    todoDialog.close();
  })
  todoDialogUpdate.addEventListener("click", () => {
    console.log(dueDate.value)
    todo.title = title.value;
    todo.dueDate = dueDate.value
    todo.priority = priority.value;
    todo.description = description.value;
    todo.completion =  completion.value;
    renderInnerMain(currProject);
  })
  todoDialogDelete.addEventListener("click", () => {
    currProject.removeTodo(todo);
    todoDialog.close();
    console.log(currProject)
    renderInnerMain(currProject);
  })
  todoDialog.showModal();
}

export function createNewTodo(currProject) {
  const newTodoDialog = document.querySelector(".newTodoDialog");
  const newTodoBtn = document.querySelector(".newTodoBtn");
  const newTodoDialogForm = document.querySelector(".newTodoDialog form");
  const newTodoDialogCancel = document.querySelector("#ntCancel");

  newTodoBtn.addEventListener("click", () => {
    document.querySelectorAll(".newTodoDialog input").forEach((i) => {
      i.value = "";
    });
    document.querySelector(".newTodoDialog select").value = "";
    newTodoDialog.showModal();
  });
  newTodoDialogForm.addEventListener("submit", () => {
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
