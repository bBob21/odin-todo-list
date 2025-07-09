import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { format } from "date-fns";

export function createNewProjectDialog(appState) {
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
    appState.projectList.push(newProject);
    renderProjects(appState);
  });
  newProjectDialogCancel.addEventListener("click", () => {
    newProjectDialog.close();
  });
}

function renderProjects(appState) {
  const sidebar = document.querySelector(".sidebar");
  const projectContainer = document.querySelector(".projectContainer");
  projectContainer.innerHTML = "";
  appState.projectList.forEach((p) => {
    let projectBox = document.createElement("li");
    projectBox.id = p.id;
    let projectBtn = document.createElement("button");
    projectBtn.textContent = p.name;
    projectBtn.addEventListener("click", () => {
      appState.currProjectID = p.id;
      renderTodos(appState);
      highlightCurrProject(appState);
    });
    let editProjectBtn = document.createElement("button");
    editProjectBtn.textContent = "Edit";
    editProjectBtn.addEventListener("click", () => {
      editProjectDialog(appState, p);
    })
    projectBox.append(projectBtn, editProjectBtn);
    projectContainer.appendChild(projectBox);
  });

  sidebar.appendChild(projectContainer);
}

function editProjectDialog(appState, project){
  const dialogContainer = document.querySelector(".editDialogContainer");
  dialogContainer.innerHTML = `
    <dialog class="editProjectDialog">
      <p>Edit existing project</p>
      <form method="dialog">
        <label for="epName">Name:</label>
        <input id="epName" type="text" required />
        <button id="epUpdate">Update</button>
        <button id="epDelete">Delete</button>
        <button id="epCancel">Cancel</button>
      </form>
    </dialog>
  `
  const editProjectDialog = document.querySelector(".editProjectDialog");
  const editProjectDialogUpdate = document.querySelector("#epUpdate");
  const editProjectDialogCancel = document.querySelector("#epCancel");
  const editProjectDialogDelete = document.querySelector("#epDelete");
  const name = document.querySelector("#epName");
  name.value = project.name;
  editProjectDialogCancel.addEventListener("click", () => {
    editProjectDialog.close();
  })
  editProjectDialogUpdate.addEventListener("click", () => {
    project.name = name.value;
    renderProjects(appState);
  })
  editProjectDialogDelete.addEventListener("click", () => {
    appState.projectList = appState.projectList.filter((p) => p.id !== project.id);
    editProjectDialog.close();
    if (project === appState.getCurrProject()){
      appState.currProjectID = appState.projectList[0].id; // TODO: what if delete last project in list
    }
    renderProjects(appState);
    highlightCurrProject(appState)
    renderTodos(appState)
  })
  editProjectDialog.showModal();
}

export function highlightCurrProject(appState){
    const projectBoxes = document.querySelectorAll(".projectContainer > li");
    projectBoxes.forEach(p => {
      let isSelected = (p.id === appState.currProjectID);
      p.classList.toggle("currProject", isSelected);
    });
  }

function renderTodos(appState) {
  const todoContainer = document.querySelector(".todoContainer");
  todoContainer.innerHTML = "";
  appState.getCurrProject().getTodoList.forEach((t) => {
    let todoBox = document.createElement("div");
    todoBox.classList.add("todoBox");

    let todoCard = document.createElement("div");
    todoCard.textContent = t.title + " " + format(t.dueDate, "dd MMM, yyyy - HH:mm");

    let editTodoDialogBtn = document.createElement("button");
    editTodoDialogBtn.textContent = "Edit";
    editTodoDialogBtn.addEventListener("click", () => {
      editTodoDialog(appState, t);
    })
    todoBox.append(todoCard, editTodoDialogBtn)
    todoContainer.appendChild(todoBox);
  });
  const newTodoBtn = document.createElement("button");
  newTodoBtn.textContent = "New Todo";
}

function editTodoDialog(appState, todo){
  const dialogContainer = document.querySelector(".editDialogContainer");
  dialogContainer.innerHTML = `
    <dialog class="editTodoDialog">
      <p>Edit existing todo</p>
      <form method="dialog">
        <label for="etTitle">Title:</label>
        <input id="etTitle" type="text" required />
        <label for="etDueDate">Due Date:</label>
        <input id="etDueDate" type="date" required />
        <label for="etPriority">Priority:</label>
        <select id="etPriority" required>
          <option value="1">!</option>
          <option value="2">!!</option>
          <option value="3">!!!</option>
        </select>
        <label>Completion:</label>
        <input id="etCompletion" type="checkbox">
        <label for="etCompletion">Done</label>
        <label for="etDescription">Description</label>
        <input id="etDescription" type="text" />
        <button id="etUpdate">Update</button>
        <button id="etDelete">Delete</button>
        <button id="etCancel">Cancel</button>
      </form>
    </dialog>
  `
  const editTodoDialog = document.querySelector(".editTodoDialog");
  const editTodoDialogUpdate = document.querySelector("#etUpdate");
  const editTodoDialogCancel = document.querySelector("#etCancel");
  const editTodoDialogDelete = document.querySelector("#etDelete")
  const title = document.querySelector("#etTitle");
  const dueDate = document.querySelector("#etDueDate");
  const priority = document.querySelector("#etPriority");
  const completion = document.querySelector("#etCompletion");
  const description = document.querySelector("#etDescription");
  title.value = todo.title;
  dueDate.value = format(todo.dueDate, "yyyy-MM-dd");
  priority.value = todo.priority;
  if (todo.completion) completion.checked = true;
  description.value = todo.description;

  editTodoDialogCancel.addEventListener("click", () => {
    editTodoDialog.close();
  })
  editTodoDialogUpdate.addEventListener("click", () => {
    todo.title = title.value;
    todo.dueDate = dueDate.value
    todo.priority = priority.value;
    todo.description = description.value;
    todo.completion =  completion.value;
    renderTodos(appState);
  })
  editTodoDialogDelete.addEventListener("click", () => {
    appState.getCurrProject().removeTodo(todo);
    editTodoDialog.close();
    renderTodos(appState);
  })
  editTodoDialog.showModal();
}

export function createNewTodoDialog(appState) {
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
    appState.getCurrProject().addTodo(newTodo);
    renderTodos(appState);
  });
  newTodoDialogCancel.addEventListener("click", () => {
    newTodoDialog.close();
  });
}

export function render(appState) {
  renderProjects(appState);
  highlightCurrProject(appState);
  renderTodos(appState);
  
}
