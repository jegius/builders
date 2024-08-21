import {TodoApp} from './components/todo-app.js';
import {TodoItem} from './components/todo-item.js';
import {TodoModal} from './components/todo-modal.js';
import {TodoService} from './services/todo-service.js';
import {registerService} from './services/di-container.js';

registerService('todoService', new TodoService());

customElements.define('todo-modal', TodoModal);
customElements.define('todo-app', TodoApp);
customElements.define('todo-item', TodoItem);