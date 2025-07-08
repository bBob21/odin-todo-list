import {Project} from "./project.js";

export function createEventSidebar(projectList){
    const newProjectDialog = document.querySelector(".newProjectDialog");
    const newProjectBtn = document.querySelector(".newProjectBtn");
    const saveNewProjectDialog = document.querySelector("#npSave");
    const cancelNewProjectDialog = document.querySelector("#npCancel");
    
    newProjectBtn.addEventListener("click", () => {
        document.querySelectorAll(".newProjectDialog input").forEach(i => {
            i.value = ""
        })
        newProjectDialog.showModal();
    });
    saveNewProjectDialog.addEventListener("click", () => {
        let newProject = new Project(document.querySelector("#npName").value);
        projectList.push(newProject);
        render(projectList);
    })
    cancelNewProjectDialog.addEventListener("click", () => {
        projectDialog.close();
    })
}

function renderSidebar(projectList){
    const sidebar = document.querySelector(".sidebar");
    const projectContainer = document.querySelector(".projectContainer");
    projectContainer.innerHTML = "";
    projectList.forEach(p => {
        let project = document.createElement("li");
        project.textContent = p.name;
        projectContainer.appendChild(project);
    });

    sidebar.appendChild(projectContainer)
}

function renderInnerMain(currProject){
    const innerMain = document.querySelector(".innerMain");
    currProject.getTodoList.forEach(t => {
        let todo = document.createElement("div");
        todo.textContent = t.title;
        innerMain.appendChild(todo);
    });

}

export function render(projectList, currProject){
    renderSidebar(projectList);
    renderInnerMain(currProject);
}