export const overlay = document.querySelector(".overlay")

export class Overlay{
    hide(){
        overlay.style.display = "none";
    }
    show(){
        overlay.style.display = "block";
        overlay.addEventListener("click", () => overlay.style.display = "none")
    }
}

