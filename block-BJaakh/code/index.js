(function () {
  let todoUl = document.querySelector('.todo-items');
  let todoInput = document.querySelector(`input[type ="text"]`);
  let url = `https://basic-todo-api.vercel.app/api/todo`;

  function handleDelete(id) {
    fetch(url + `/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      fetchData();
    });
  }

  function handleToggle(id, status) {
    let data = {
      todo: {
        isCompleted: !status,
      },
    };
    fetch(url + `/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchData();
    });
  }

  function editTodo(event, id, title) {
    let input = document.createElement('input');
    input.value = title;
    let p = event.target;
    let parent = event.target.parentElement;
    parent.replaceChild(input, p);
    console.log(input, p, parent);
    input.addEventListener('keyup', (event) => {
      if (event.keyCode === 13 && event.target.value) {
        let data = {
          todo: {
            title: event.target.value,
          },
        };
        fetch(url + `/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(() => {
          fetchData();
        });
      }
    });
  }

  function displayTodos(data) {
    todoUl.innerHTML = '';
    data.forEach((todo) => {
      let li = document.createElement('li');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = todo.isCompleted;
      input.addEventListener('click', () =>
        handleToggle(todo._id, todo.isCompleted)
      );
      input.setAttribute('data-id', todo._id);
      let p = document.createElement('p');
      p.innerText = todo.title;
      p.addEventListener('dblclick', (event) => {
        editTodo(event, todo._id, todo.title);
      });
      let span = document.createElement('span');
      span.innerText = 'X';
      span.addEventListener('click', () => handleDelete(todo._id));
      span.setAttribute('data-id', todo._id);
      li.append(input, p, span);
      todoUl.append(li);
    });
  }

  function fetchData() {
    fetch(url)
      .then((res) => res.json())
      .then((allTodos) => {
        displayTodos(allTodos.todos);
      });
  }
  function addTodo(event) {
    if (event.keyCode === 13 && event.target.value.trim()) {
      let data = {
        todo: {
          title: event.target.value,
          isCompleted: false,
        },
      };
      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }).then(() => {
        event.target.value = '';
        fetchData();
      });
    }
  }
  todoInput.addEventListener('keyup', addTodo);
  fetchData();
})();
