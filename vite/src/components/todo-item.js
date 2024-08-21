export class TodoItem extends HTMLElement {
    constructor(todo) {
        super();
        this.todo = todo;
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const checkbox = this.todo.done ? 'checked' : '';
        const textStyle = this.todo.done ? 'text-decoration: line-through;' : '';
        const backgroundColor = this.todo.done ? 'rgba(144, 238, 144, 0.3)' : 'white';

        this.shadowRoot.innerHTML = `
      <style>
        .todo-card {
          display: flex;
          flex-direction: column;
          position: relative;
          justify-content: space-between;
          margin: 10px;
          padding: 15px;
          background: ${backgroundColor};
          border-radius: 8px;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 300px;
          transition: box-shadow 0.3s ease;
        }
        .todo-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .todo-title {
          font-weight: bold;
          font-size: 18px;
          user-select: none;
          ${textStyle}
          margin-bottom: 10px;
          outline: none;
        }
        .todo-description {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
          outline: none;
        }
        .todo-actions {
          display: flex;
          justify-content: flex-end;
        }
        button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          font-size: 16px;
          transition: color 0.3s ease;
        }
        button:hover {
          color: #ff0000; /* Red color on hover */
        }
        button::after {
          content: "✕"; /* Cross icon */
        }
        input[type="checkbox"] {
          appearance: none;
          width: 16px;
          height: 16px;
          margin-right: 10px;
          border: 2px solid #888;
          border-radius: 3px;
          display: inline-block;
          vertical-align: middle;
        }
        input[type="checkbox"]:checked {
          background-color: #007BFF;
          border-color: #007BFF;
        }
        input[type="checkbox"]:focus {
          outline: none;
        }
      </style>
      <div class="todo-card">
        <div class="todo-header">
          <input type="checkbox" ${checkbox}>
          <span class="todo-title" contenteditable="true">${this.todo.title}</span>
        </div>
        <span class="todo-description" contenteditable="true">${this.todo.description}</span>
        <div class="todo-actions">
          <button class="delete"></button>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            this.todo.done = !this.todo.done;
            this.render();
        });

        this.shadowRoot.querySelector('.delete').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete', {detail: this.todo.id}));
        });
    }
}