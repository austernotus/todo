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
    
    const addTodoButton = document.createElement("button");
    addTodoButton.innerHTML = " + ";
    showTodoForm(addTodoButton,projectList, project);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Project";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.replaceChildren(),
        deleteProject(project)
        }
    )
    const details = document.createElement("p");
    details.innerHTML = project.details;

    const todoDiv = populateTodos(project)

    newDiv.append(title,details,todoDiv,addTodoButton,deleteButton );

    changeMain(newDiv)
}

function populateTodos(project){
    let allTodos = document.createElement("div")
    const todoList = project.getTodo();
    for (const todo in todoList){
    const todoDiv = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = todoList[todo].title;

    const completedLabel = document.createElement("label");

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todoList[todo].completed;
    completedCheckbox.addEventListener("change", () => {
        todoList[todo].completed = completedCheckbox.checked;
    });

    const completedContainer = document.createElement("div");
    completedContainer.appendChild(completedLabel);
    completedContainer.appendChild(completedCheckbox);

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", ()=>{
        todoDiv.parentNode.removeChild(todoDiv);
        project.removeTodo(todo);
    })

    todoDiv.append(title,completedContainer, deleteTodoButton);
    allTodos.append(todoDiv);
    console.log(title);
        }
    
    return allTodos;
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
        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = todo.completed;
        completedCheckbox.addEventListener("change", () => {
            todo.completed = completedCheckbox.checked;
        });
    
        const completedContainer = document.createElement("div");
        completedContainer.appendChild(completedCheckbox);
        newDiv.append(todoCard, completedCheckbox);
    })

    changeMain(newDiv)
}

function changeMain(div){
    mainContent.innerHTML = "";
    mainContent.append(div);
}

viewNotes.addEventListener("click", () => viewAllNotes())

populateSidebar();