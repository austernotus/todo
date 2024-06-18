export default class Project{
    constructor(title,details){
        this.title = title;
        this.details = details;
        this.todoList = [];
    }
    addTodo(todo){
        this.todoList.push(todo);
    }
    removeTodo(todo){
        const index = this.todoList.indexOf(todo);
        this.todoList.splice(index,1);
    }
    getTodo(){
        return this.todoList;
    }
}