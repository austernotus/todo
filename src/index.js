import Project from "./projects";
import {Todo, showTodoForm, addTodoFormEvents} from "./todos";
import './styles.css';
import {addFormEvents} from "./form";

const mainContent = document.querySelector("#main");
const projectSection = document.querySelector("#project-section");
const viewNotes = document.querySelector("#view-notes");

let projectList = [];

const test = new Project("Trip","Things to Pack");
const blah = new Project("Game Dev","Ideas to Program");

const todoTest = new Todo("Brush","hair brush","24/06","High","Trip")
const todoTest2 = new Todo("Brushesssss","hair brush","24/06","High","Trip")

test.addTodo(todoTest)
test.addTodo(todoTest2)

projectList.push(test)
projectList.push(blah)

addFormEvents();
addTodoFormEvents();

document.addEventListener('formSubmitted', (event) => {
    const formData = event.detail;
    console.log('Form data received in index.js:', formData);

    addNewProject(formData);

});

document.addEventListener('todoSubmitted', (event) => {
    const formData = event.detail;
    console.log('Todo data received in index.js:', formData);

    let currentProject = null;
    for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].title === formData.project) {
          currentProject = projectList[i];
          break;
        }
      }

    console.log(currentProject);

    currentProject.addTodo(formData)
    viewProject(currentProject)

    //addNewProject(formData);

});

function addNewProject(data){
    const project = new Project(data.title, data.description);

    projectList.push(project)
    populateSidebar()
}

function populateSidebar(){
    projectSection.replaceChildren();
    const ul = document.createElement("ul");

    projectList.forEach((project) => {
        const titleLi = document.createElement("li");
        titleLi.innerHTML = project.title;
        titleLi.addEventListener("click", () => viewProject(project))
        ul.append(titleLi);
    });
    projectSection.append(ul)
}

function viewProject(project){
    const newDiv = document.createElement("div");
    const title = document.createElement("h2");
    title.innerHTML = project.title;
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Project";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.replaceChildren(),
        deleteProject(project)
        }
    )

    const addTodoButton = document.createElement("button");
    addTodoButton.innerHTML = " + ";
    showTodoForm(addTodoButton);

    const details = document.createElement("p");
    details.innerHTML = project.details;

    newDiv.append(title,details, deleteButton, addTodoButton);

    changeMain(newDiv)
}

function deleteProject(project){
        const index = projectList.indexOf(project);
        projectList.splice(index,1);
        populateSidebar();
}

function viewAllNotes(){
    const newDiv = document.createElement("div");
    let allTodos = []

    projectList.forEach(project => {
        const projectToDo = project.getTodo();
        projectToDo.forEach(todo =>{
            allTodos.push(todo);
        })
    });

    allTodos.forEach(todo =>{
        const todoCard = document.createElement("p")
        todoCard.innerHTML = todo.title;
        newDiv.append(todoCard);
    })

    changeMain(newDiv)
}

function changeMain(div){
    mainContent.innerHTML = "";
    mainContent.append(div);
}

viewNotes.addEventListener("click", () => viewAllNotes())

populateSidebar();