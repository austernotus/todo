export const overlay = document.querySelector(".overlay")
const expandedTodo = document.getElementById("expanded-todo")
const todoForm = document.getElementById("todo-form")
const form = document.querySelector("#form")

export class Overlay{
    hide(){
        overlay.style.display = "none";
    }
    show(){
        overlay.style.display = "block";
        overlay.addEventListener("click", () => overlay.style.display = "none")
    }
}

overlay.addEventListener("click", ()=>{
    form.style.display = "none";
    expandedTodo.style.display = "none";
    todoForm.style.display = "none";
})