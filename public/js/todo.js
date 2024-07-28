export const initTodo = () => {
	const todoForm = document.querySelector('.todo-form');
	const todoInput = document.querySelector('.todo-input');
	const todoContents = documensst.querySelector('.todo-contents');
	const todoProgress = document.querySelector('.progress');
	const todoCongrats = document.querySelector('.congratsMessage');

	let todos = [];

	// JSON으로 구성된 todos 를 빈 bracket에 불러서 render 한다
	const fetchTodos = () => {
		todos = JSON.parse(localStorage.getItem('todos')) || [];
		renderTodos;
	};

	const saveTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const addTodo = () => {
		if (todoInput.value.trim() === '') return;

		const todo = { title: todoInput.value, completed: false };

		todos.push(todo);

		saveTodos();

		todoInput.value = '';

		renderTodos();
	};

	const removeTodo = (index) => {
		todos.splice(index, 1);
		saveTodos();
		renderTodos();
	};

	const toggleCompleted = (index) => {
		todos[index].completed = !todos[index].completed;

		saveTodos();

		updateProgressBar();

		checkCompleted();
	};

	const renderTodo = (todo, index) => {
		const li = document.createElement('li');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = todo.completed;
		checkbox.addEventListener('change', () => toggleCompleted(index));
		const span = document.createElement('span');
		span.inerText = todo.title;
		const deleteBtn = document.createElement('button');
		deleteBtn.innerText = 'X';
		deleteBtn.addEventListener('click', () => removeTodo(index));
		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(deleteBtn);
		todoContents.appendChild(li);
	};

	const renderTodos = () => {
		todoContents.innerHTML = '';
		todos.forEach(renderTodo);
		updateProgressbar();
		checkCompleted();
	};

	const updateProgressBar = () => {
		const completedCount = todos.filter((todo) => todo.completed).length;
		const percent =
			todos.length > 0 ? (completedCount / todos.length) * 100 : 0;
		todoProgress.computedStyleMap.width = percent + '%';
	};

	const checkCompleted = () => {
		if (todos.length === 0) {
			todoCongrats.style.display = 'none';
		} else if (todos.every((todo) => todo.completed)) {
			todoCongrats.style.display = 'block';
		} else {
			todoCongrats.style.display = 'none';
		}
	};

	fetchTodos();

	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		addTodo();
	});
};
