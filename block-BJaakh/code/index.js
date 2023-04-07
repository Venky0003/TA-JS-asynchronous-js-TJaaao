(function(){
let todoUl = document.querySelector('.todo-items');
let todoInput = document.getElementById('todoInput');

let todos = [];

function listTodos() {
  let title = todoInput.value.trim();
  console.log('Title:', title);
  if (title === '' || title.length <= 2) {
    alert('Please enter a valid todo');
  }
  let newTodo = { id: Date.now(), title };
  fetch(`https://basic-todo-api.vercel.app/api/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((data) => {
      todos.push(data);
      displayTodos();
      todoInput.value = '';
    })
    .catch((error) => {
      console.log(error);
    });
}

function editTodo(id) {
  const newTitle = prompt('Enter new title');
  const todo = todos.find((todo) => todo.id === id);
  if (!newTitle) {
    alert('Please enter a valid title');
    return;
  }
  fetch(`basic-todo-api.vercel.app/api/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...todo, title: newTitle }),
  })
    .then((response) => response.json())
    .then((data) => {
      todos = todos.map((todo) => (todo.id === id ? data : todo));
      displayTodos();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function deleteTodo(id) {
  fetch(`basic-todo-api.vercel.app/api/todo/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      todos = todos.filter((todo) => todo.id !== id);
      displayTodos();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displayTodos() {
    todoUl.innerHTML = '';
  todos.forEach((todo) => {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerText = todo.title;
    p.addEventListener('dblclick', () => {
        editTodo(todo.id, p);
      });
    let span = document.createElement('span');
    let button = document.createElement('button');
    button.innerText = 'Delete';
    button.addEventListener('click', () => deleteTodo(todo.id));
    span.append( button);
    li.append(p, span);
    todoUl.append(li);
  });
}

function fetchTodos() {
  fetch(`https://basic-todo-api.vercel.app/api/todo`)
    .then((res) => res.json())
    .then((data) => {
      todos = Array.from(data);
      displayTodos(todos);
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchTodos();

todoInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    listTodos();
  }
});
})()