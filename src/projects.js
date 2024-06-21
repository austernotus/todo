export default class Project {
	constructor(title, details) {
		this.title = title;
		this.details = details;
		this.todoList = [];
	}
	addTodo(todo) {
		this.todoList.push(todo);
	}
	removeTodo(todo) {
		this.todoList.splice(todo, 1);
		console.log(this.todoList);
	}
	getTodo() {
		return this.todoList;
	}
}
