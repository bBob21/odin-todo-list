import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { format } from "date-fns";

export function createNewProjectDialog(projectList) {
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
    renderProjects(projectList);
  });
  newProjectDialogCancel.addEventListener("click", () => {
    newProjectDialog.close();
  });
}

function renderProjects(projectList) {
  const sidebar = document.querySelector(".sidebar");
  const projectContainer = document.querySelector(".projectContainer");
  projectContainer.innerHTML = "";
  projectList.forEach((p) => {
    let project = document.createElement("li");
    let projectBtn = document.createElement("button");
    projectBtn.textContent = p.name;
    projectBtn.id = p.id;
    projectBtn.addEventListener("click", () => {
      renderTodos(p);
      setCurrProject(p);
    });
    let editProjectBtn = document.createElement("button");
    editProjectBtn.textContent = "Edit";
    editProjectBtn.addEventListener("click", () => {
      editProjectDialog(projectList, p);
    })
    project.append(projectBtn, editProjectBtn);
    projectContainer.appendChild(project);
  });

  sidebar.appendChild(projectContainer);
}

function editProjectDialog(projectList, project){
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
    console.log(name.value)
    console.log(project.name)
    console.log(projectList)
    console.log(project)
    renderProjects(projectList);
  })
  editProjectDialogDelete.addEventListener("click", () => {
    console.log(project.id)
    projectList = projectList.filter((p) => p.id !== project.id);
    console.log(projectList)
    console.log(project)
    editProjectDialog.close();
    renderProjects(projectList);
    setCurrProject(projectList[0])
    renderTodos(projectList[0])
  })
  editProjectDialog.showModal();
}

export function setCurrProject(selectedProject){
  // TODO: make this work
    const projectContainer = document.querySelector(".projectContainer");
    let previousProjectID = projectContainer.dataset.currProjectID;
    let previousProjectDOM;
    if (!!previousProjectID && !!(previousProjectDOM = document.getElementById(previousProjectID))){
      previousProjectDOM.classList.remove("currProject");
    }

    projectContainer.dataset.currProjectID = selectedProject.id;
    const selectedProjectDOM = document.getElementById(selectedProject.id)
    selectedProjectDOM.classList.add("currProject");
  }

function renderTodos(currProject) {
  const todoContainer = document.querySelector(".todoContainer");
  todoContainer.innerHTML = "";
  currProject.getTodoList.forEach((t) => {
    let todoBox = document.createElement("div");
    todoBox.classList.add("todoBox");

    let todoCard = document.createElement("div");
    todoCard.textContent = t.title + " " + format(t.dueDate, "dd MMM, yyyy - HH:mm");

    let editTodoDialogBtn = document.createElement("button");
    editTodoDialogBtn.textContent = "Edit";
    editTodoDialogBtn.addEventListener("click", () => {
      editTodoDialog(currProject, t);
    })
    todoBox.append(todoCard, editTodoDialogBtn)
    todoContainer.appendChild(todoBox);
  });
  const newTodoBtn = document.createElement("button");
  newTodoBtn.textContent = "New Todo";
}

function editTodoDialog(currProject, todo){
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
    renderTodos(currProject);
  })
  editTodoDialogDelete.addEventListener("click", () => {
    currProject.removeTodo(todo);
    editTodoDialog.close();
    renderTodos(currProject);
  })
  editTodoDialog.showModal();
}

export function createNewTodoDialog() {
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
    let currProjectID = document.querySelector(".projectContainer").dataset.currProjectID;
    let currProject = projectList.find(p => p.id == currProjectID);

    let title = document.querySelector("#ntTitle").value;
    let dueDate = document.querySelector("#ntDueDate").value;
    let priority = document.querySelector("#ntPriority").value;
    let description = document.querySelector("#ntDescription").value;

    let newTodo = new Todo(title, dueDate, priority, description);
    currProject.addTodo(newTodo);
    renderTodos(currProject);
  });
  newTodoDialogCancel.addEventListener("click", () => {
    newTodoDialog.close();
  });
}

export function render(projectList, currProject) {
  renderProjects(projectList);

  setCurrProject(currProject);
  renderTodos(currProject);
  
}
