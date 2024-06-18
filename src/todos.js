export default class Todo{
    constructor(title,description,due,priority,project,completed = false){
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }
}