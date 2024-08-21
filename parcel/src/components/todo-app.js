import { getService } from '../services/di-container.js';
import './todo-item.js';
import './todo-modal.js';

export class TodoApp extends HTMLElement {
    todoService = getService('todoService');

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.updateTodoList();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                font-family: Arial, sans-serif;
                padding: 16px;
            }

            button {
                background-color: #007BFF; /* Web color */
                color: #fff; /* White text */
                padding: 10px 20px;
                border: none;
                border-radius: 5px; /* Light rounding of the edges */
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease;
                font-size: 16px;
                display: inline-block;
                text-align: center;
                text-decoration: none;
                margin: 5px 0;
            }

            button:hover {
                background-color: #0056b3; /* Darker blue on hover */
                transform: scale(1.05); /* Slightly scale up on hover */
            }

            #todo-list {
                display: flex;
                margin-top: 10px;
            }
        </style>
        <button id="add-todo">Добавить задачку</button>
        <todo-modal></todo-modal>
        <div id="todo-list"></div>
        `;

        this.shadowRoot.querySelector('#add-todo').addEventListener('click', () => this.openModal());

        const modal = this.shadowRoot.querySelector('todo-modal');
        modal.addEventListener('add-todo', (event) => {
            this.todoService.addTodo(event.detail);
            this.updateTodoList();
        });
    }

    openModal() {
        const modal = this.shadowRoot.querySelector('todo-modal');
        modal.show();
    }

    updateTodoList() {
        const todos = this.todoService.getTodos();
        const todoList = this.shadowRoot.querySelector('#todo-list');

        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }

        todos.forEach(todo => {
            const todoItem = document.createElement('todo-item');
            todoItem.todo = todo;

            todoItem.addEventListener('delete', () => {
                this.todoService.removeTodoById(todo.id);
                this.updateTodoList();
            });

            todoItem.addEventListener('change', () => {
                this.todoService.updateTodo(todoItem.todo);
                this.updateTodoList();
            });

            todoList.appendChild(todoItem);
        });
    }
}