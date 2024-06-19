const newProjectButton = document.querySelector("#new-project");
const overlay = document.querySelector(".overlay")
const form = document.querySelector("#form")
const cancelButton = document.querySelector("#cancel-form");

export function addFormEvents(){
    console.log("blah")
    newProjectButton.addEventListener("click", ()=> {form.style.display = "block", 
        overlay.style.display = "block";})
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        const newProject = handleFormSubmit();

        const newEvent = new CustomEvent('formSubmitted', { detail: newProject });
        document.dispatchEvent(newEvent);
        
        form.reset();
        overlay.style.display = "none";   
        form.style.display="none"
    })
    cancelButton.addEventListener("click", (event) =>{
        event.preventDefault();
        form.reset();
        overlay.style.display = "none";   
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