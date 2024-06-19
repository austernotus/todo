import { Overlay } from "./dom";
const newProjectButton = document.querySelector("#new-project");
const form = document.querySelector("#form")
const overlay = new Overlay();
const cancelButton = document.querySelector("#cancel-form");

export function addFormEvents(){
    newProjectButton.addEventListener("click", ()=> {form.style.display = "block", 
        overlay.show();})
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        const newProject = handleFormSubmit();

        const newEvent = new CustomEvent('formSubmitted', { detail: newProject });
        document.dispatchEvent(newEvent);
        
        form.reset();
        overlay.hide();   
        form.style.display="none"
    })
    cancelButton.addEventListener("click", (event) =>{
        event.preventDefault();
        form.reset();
        overlay.hide();   
        form.style.display="none"
    })

}

function handleFormSubmit(){
    const formData = {
        title: document.getElementById("form-title").value,
        description: document.getElementById("form-description").value
    }
    return formData;
}