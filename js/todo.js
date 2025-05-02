export const todo = () => {
    const todoForm = document.querySelector('#form-todo');
    const author = document.getElementById('author');
    const post = document.getElementById('post');
    const todoTitle = document.querySelector('.todo__title');
    const todoBtn = document.querySelector('.todo__btn');
    const list = document.querySelector('.todo__list');
    const todo__count = document.querySelector('.todo__count');

    const base = {
        init() {
            this.todo = this.getTodoLS();
        },

        employee: 'Петров Сергей Иванович',
        todo: [],
        delTodo(id) {
            const index = this.todo.findIndex(todo => todo.id === id);
            if (index !== -1) {
                this.todo.splice(index, 1);
            }
            this.setTodoLS();
        },
        addTodo(author, post) {
            const todo = {
                id: 'id' + (Date.now()),
                author,
                post,
                ready: false,
            };
            this.todo.push(todo);
            this.setTodoLS();
            return todo;
        },
        check(id) {
            for (let i = 0; i < this.todo.length; i++) {
                if (this.todo[i].id === id) {
                    this.todo[i].ready = true;
                }
            }
            this.setTodoLS();
        },

        getTodoLS() {
            if (localStorage.getItem('todo')) {
                return JSON.parse(localStorage.getItem('todo'));
            }
            return [];
        },

        setTodoLS() {
            localStorage.setItem('todo', JSON.stringify(this.todo));
        }
    }

    const addCountTodo = () =>{
        todo__count.innerText = base.todo.length;
    }

    const addTodo = (event) => {
        event.preventDefault();

        const authorText = author.value;
        const postText = post.value;

        const objTodo = base.addTodo(authorText, postText);
        const todoLi = createTodo(objTodo);

        list.append(todoLi);
        addCountTodo();
        todoForm.reset();
    };

    const createTodo = ({ ready, author, post, id }) => {
        const todoItem = `
    <article class="post ${ready ? 'post_complete' : ''}">
        <h3 class="post__author">${author}</h3>
        <p class="post__todo">${post}</p>
        ${!ready ?
                `<button 
                class="post__ready" 
                type="button"
                data-id="${id}">
                ✔</button>` : ''}
                <button 
                class="post__delete" 
                type="button"
                data-id="del-${id}">
                X</button>
    </article> `;
        const li = document.createElement('li');
        li.classList.add('todo__list-item');
        li.innerHTML = todoItem;
        return li;
    };

    const renderTodo = () => {
        base.init();
        for (let i = 0; i < base.todo.length; i++) {
            const todoLi = createTodo(base.todo[i]);
            list.append(todoLi);
        }
        addCountTodo();
    };

    const checkTodo = event => {
        let btn = event.target.closest('.post__ready');
        if (btn) {
            const post = btn.closest('.post');
            btn.remove();
            post.classList.add('post_complete');
            const id = btn.dataset.id;
            base.check(id);
        }
        else {
            btn = event.target.closest('.post__delete');
            if (btn) {
                const post = btn.closest('.post');
                const id = btn.dataset.id.slice(4);
                base.delTodo(id);
                post.remove();
                addCountTodo();
            }
        }
        
    };

    todoForm.addEventListener('submit', addTodo);
    list.addEventListener('click', checkTodo);

    renderTodo();
};
