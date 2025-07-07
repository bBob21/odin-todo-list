import {Project} from "./project.js";

export function createEventSidebar(projectList){
    const projectDialog = document.querySelector(".newProjectDialog");
    const newProjectBtn = document.querySelector(".newProjectBtn");
    const submitProjectDialog = document.querySelector("#pSubmit");
    const cancelProjectDialog = document.querySelector("#pCancel");
    
    newProjectBtn.addEventListener("click", () => {
        document.querySelectorAll(".newProjectDialog input").forEach(i => {
            i.value = ""
        })
        projectDialog.showModal();
    });
    submitProjectDialog.addEventListener("click", () => {
        let newProject = new Project(document.querySelector("#pName").value);
        projectList.push(newProject);
        render(projectList);
    })
    cancelProjectDialog.addEventListener("click", () => {
        projectDialog.close();
    })
}

function renderSidebar(projectList){
    const sidebar = document.querySelector(".sidebar");
    const projectContainer = document.querySelector(".sidebar ul");
    projectContainer.innerHTML = "";
    projectList.forEach(p => {
        let project = document.createElement("li");
        project.textContent = p.name;
        projectContainer.appendChild(project);
    });
    sidebar.appendChild(projectContainer)
}

export function render(projectList){
    renderSidebar(projectList);
    const innerMain = document.querySelector(".innerMain");
}