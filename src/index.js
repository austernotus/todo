import Project from "./projects";
import {Todo, showTodoForm, addTodoFormEvents} from "./todos";
import './styles.css';
import {addFormEvents} from "./form";
import { Overlay} from "./dom";

const myOverlay = new Overlay();
const mainContent = document.querySelector("#main");
const projectSection = document.querySelector("#project-section");
const viewNotes = document.querySelector("#view-notes");

const projectList = [];

function createDefaultProject(){
    const defaultProject = new Project("Trip To Hawaii","Things to Pack");
    const todo1 = new Todo("Brush","A hair brush.","2024-06-21","High","Trip To Hawaii")
    const todo2 = new Todo("Small Backpack","To carry essentials.","2024-06-24","High","Trip To Hawaii")
    const todo3 = new Todo("First-Aid Kit","In case of accidents.","2024-06-25","Low","Trip To Hawaii")
    const todo4 = new Todo("Shampoo","A good one.","2024-06-28","Medium","Trip To Hawaii")
    const todo5 = new Todo("Portable Wi-Fi Spot","I need some doomscrolling.","2024-06-30","High","Trip To Hawaii")
    
    defaultProject.addTodo(todo1)
    defaultProject.addTodo(todo2)
    defaultProject.addTodo(todo3)
    defaultProject.addTodo(todo4)
    defaultProject.addTodo(todo5)

    projectList.push(defaultProject)
}

if (projectList.length === 0){
    createDefaultProject()
}

viewProject(projectList[0])

addFormEvents();
addTodoFormEvents();

document.addEventListener('formSubmitted', (event) => {
    const formData = event.detail;
    addNewProject(formData);

});

document.addEventListener('todoSubmitted', (event) => {
    const formData = event.detail;
    let currentProject = null;
    for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].title === formData.project) {
          currentProject = projectList[i];
          break;
        }
      }

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
    addTodoButton.className = "add";
    addTodoButton.innerHTML = " + ";
    showTodoForm(addTodoButton,projectList, project);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete"
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
        todoDiv.className = "todo-item";
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
        deleteTodoButton.className = "delete"
        deleteTodoButton.textContent = "Delete";
        deleteTodoButton.addEventListener("click", ()=>{
            todoDiv.parentNode.removeChild(todoDiv);
            project.removeTodo(todo);
        })

        title.addEventListener("click", ()=>{
            expandTodo(todoList[todo], project);
        })

        todoDiv.append(title,completedContainer, deleteTodoButton);
        allTodos.append(todoDiv);
    }
    
    return allTodos;
}

function expandTodo(todo, currentProject){
    let expandedTodo = document.getElementById("expanded-todo")
    expandedTodo.replaceChildren();
    expandedTodo.style.display = "flex";
    expandedTodo.style.alignItems = "flex-start";
    
    
    let closeWindowButton = document.createElement("button");
    closeWindowButton.addEventListener("click", ()=>{
        expandedTodo.style.display = "none";
        myOverlay.hide();
    })
    closeWindowButton.textContent = "X";
    closeWindowButton.style.alignSelf = "end";
    closeWindowButton.style.fontSize = "0.45rem";
    closeWindowButton.style.padding = "10px";

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.textContent = todo.description;

    const dueLabel = document.createElement("label");
    dueLabel.innerHTML = `<b>Due: </b>`;

    const dueInput = document.createElement("input");
    dueInput.type = "date";
    dueInput.value = todo.due;
    dueInput.addEventListener("change", () => {
        todo.due = dueInput.value;
    });

    const dueContainer = document.createElement("div");
    dueContainer.appendChild(dueLabel);
    dueContainer.appendChild(dueInput);

    const priority = document.createElement("p");
    priority.innerHTML = `<b>Priority: </b>${todo.priority}`;

    const project = document.createElement("p");
    project.innerHTML = `<b>Project: </b>${todo.project}`;

    const completedLabel = document.createElement("label");
    completedLabel.innerHTML = "<b>Completed: </b>";

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todo.completed;
    completedCheckbox.addEventListener("change", () => {
        todo.completed = completedCheckbox.checked;
        viewProject(currentProject)
    });

    const completedContainer = document.createElement("div");
    completedContainer.appendChild(completedLabel);
    completedContainer.appendChild(completedCheckbox);

    expandedTodo.append(closeWindowButton, title, description,dueContainer, priority,project,completedContainer)
    myOverlay.show()
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

    for (const todo in allTodos){
        let currentProject = [];
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        const title = document.createElement("h3");
        title.textContent = allTodos[todo].title;

        const completedLabel = document.createElement("label");
        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = allTodos[todo].completed;
        completedCheckbox.addEventListener("change", () => {
            allTodos[todo].completed = completedCheckbox.checked;
        });

        const completedContainer = document.createElement("div");
        completedContainer.appendChild(completedLabel);
        completedContainer.appendChild(completedCheckbox);

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.className = "delete"
        deleteTodoButton.textContent = "Delete";
        deleteTodoButton.addEventListener("click", ()=>{
            currentProject = [];
            for (const proj of projectList){
                if (proj.title === allTodos[todo].project){
                    console.log("found")
                    currentProject = proj;
                    break
                }
            }
            todoDiv.parentNode.removeChild(todoDiv);
            currentProject.removeTodo(todo)
        })

        title.addEventListener("click", ()=>{
            expandTodo(allTodos[todo], currentProject);
        })

        todoDiv.append(title,completedContainer, deleteTodoButton);
        newDiv.append(todoDiv);
    }

    changeMain(newDiv)
}

function changeMain(div){
    mainContent.innerHTML = "";
    mainContent.append(div);
}

viewNotes.addEventListener("click", () => viewAllNotes())

populateSidebar();