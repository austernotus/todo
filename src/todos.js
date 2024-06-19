const overlay = document.querySelector(".overlay")
const todoForm = document.querySelector("#todo-form")
const cancelButton = document.querySelector("#cancel-todo");
const projectSelection = document.getElementById("project-selection")

export class Todo{
    constructor(title,description,due,priority,project,completed = false){
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }
}

export function showTodoForm(button, projectList){
    button.addEventListener("click", ()=> {
        todoForm.style.display = "block"; 
        overlay.style.display = "block";
        projectSelection.replaceChildren();
        
        for (const project of projectList){
            const title = project.title;
            const newOption = document.createElement("option");
            newOption.value = title;
            newOption.innerHTML = title;

            projectSelection.append(newOption);
        }


    })
}

export function addTodoFormEvents(){
    cancelButton.addEventListener("click", (event) =>{
        event.preventDefault();
        todoForm.reset();
        overlay.style.display = "none";   
        todoForm.style.display="none"
    })

    todoForm.addEventListener("submit", (event) =>{
        event.preventDefault();
        const newTodo = handleTodoSubmit();
        const newEvent = new CustomEvent('todoSubmitted', { detail: newTodo });
        document.dispatchEvent(newEvent);
        
        todoForm.reset();
        overlay.style.display = "none";   
        todoForm.style.display="none"
    })
}

function handleTodoSubmit(){
    const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        due: document.getElementById("due").value,
        priority: document.getElementById("priority").value,
        project: document.getElementById("project-selection").value
      };
    return formData;
}
