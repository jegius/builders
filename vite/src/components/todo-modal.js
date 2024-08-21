export class TodoModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    show() {
        const modal = this.shadowRoot.querySelector('.modal');
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            const modalContent = this.shadowRoot.querySelector('.modal-content');
            modalContent.style.transform = 'scale(1)';
        });
    }

    close() {
        const modal = this.shadowRoot.querySelector('.modal');
        const modalContent = this.shadowRoot.querySelector('.modal-content');
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.7)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          opacity: 0;
          z-index: 1;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          position: relative;
          width: 80%;
          max-width: 400px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transform: scale(0.7);
          transition: transform 0.3s ease;
        }
        h2 {
          text-align: center;
          margin-top: 0;
        }
        label {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }
        input[type="text"],
        textarea {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 8px;
          margin-top: 4px;
          font-size: 16px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        textarea {
          resize: vertical;
          height: 80px;
        }
        button {
          cursor: pointer;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background: #007bfc;
          color: white;
          font-size: 16px;
          margin-right: 10px;
        }
        #close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          color: black;
          font-size: 18px;
          padding: 0;
          line-height: 1;
        }
        #close::after {
          content: "✕";
        }
      </style>
      <div class="modal">
        <div class="modal-content">
          <button id="close"></button>
          <h2>Добавить задачу</h2>
          <label>Задача: <input type="text" id="task-title" placeholder="Название задачи"></label>
          <label>Описание: <textarea id="task-desc" placeholder="Описание задачи..."></textarea></label>
          <button id="ok">OK</button>
          <button id="cancel">Отмена</button>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector('#ok').addEventListener('click', () => {
            const title = this.shadowRoot.querySelector('#task-title').value;
            const desc = this.shadowRoot.querySelector('#task-desc').value;
            this.dispatchEvent(new CustomEvent('add-todo', { detail: { title, description: desc }}));
            this.close();
        });

        this.shadowRoot.querySelector('#cancel').addEventListener('click', () => this.close());
        this.shadowRoot.querySelector('#close').addEventListener('click', () => this.close());
    }
}