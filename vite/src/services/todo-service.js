export class TodoService {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push({ ...todo, id: Date.now(), done: false });
    }

    removeTodoById(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    updateTodo(updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            this.todos[index] = updatedTodo;
        }
    }

    getTodos() {
        return [...this.todos];
    }
}