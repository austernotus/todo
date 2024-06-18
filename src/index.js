import Project from "./projects";
import Todo from "./todos";

let projectList = []

const test = new Project("Trip","Things to Pack");
const blah = new Project("Game Dev","Ideas to Program");

const todoTest = new Todo("Brush","hair brush","24/06","High","Trip")

test.addTodo(todoTest)
console.log(test)

projectList.push(test)
projectList.push(blah)

projectList.forEach((project) =>{
    console.log(project.details);
})
