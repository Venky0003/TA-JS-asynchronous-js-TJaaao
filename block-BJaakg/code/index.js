(function () {
  let container = document.querySelector('.container');
  let ul = document.querySelector('ul');
  let modalWindow = document.querySelector('.modal-window');
  let modalClose = document.querySelector('.modal-close');
  let errorElm = document.querySelector('.error-message');
  let charactersUl = document.querySelector('.characters-ul');

  let url = `https://www.anapioficeandfire.com/api/books`;

  function handleErrorMessage(message = 'something went wrong') {
    container.style.display = 'none';
    errorElm.innerText = message;
  }

  function handleSpinner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class="spinner"> <div class="donut"></div> </div>`;
    }
  }

  function displayCharacters(chars) {
    handleSpinner(charactersUl, true);
    Promise.all(
      chars.map((char) => fetch(char).then((res) => res.json()))
    ).then((charData) => {
      charactersUl.innerHTML = '';
      charData.forEach((ch) => {
        let li = document.createElement('li');
        li.innerText = `${ch.name} : (${ch.aliases.join(' ')})`;
        charactersUl.append(li);
      });
    });
  }

  function renderBooks(books) {
    ul.innerHTML = '';
    books.forEach((book) => {
      let li = document.createElement('li');
      li.classList.add('flex-48');
      let h2 = document.createElement('h2');
      h2.innerText = book.name;
      let h4 = document.createElement('h4');
      h4.innerText = book.authors.join(' ');
      let button = document.createElement('button');
      button.innerText = `Show Characters (${book.characters.length})`;

      button.addEventListener('click', () => {
        modalWindow.style.display = 'block';
        displayCharacters(book.characters);
        modalWindow
          .querySelector('.modal-close')
          .addEventListener('click', () => {
            modalWindow.style.display = 'none';
          });
      });
      li.append(h2, h4, button);
      ul.append(li);
    });
  }
  function openPopup() {
    popup.style.display = 'block';
  }

  function fetchData() {
    handleSpinner(ul, true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error :${res.status}`);
      })
      .then((books) => {
        console.log(books);
        if (Array.isArray(books)) {
          renderBooks(books);
        }
      })
      .catch((error) => {
        ul.innerText = error;
      })
      .finally(() => {
        handleSpinner(ul);
      });
  }
  if (navigator.onLine) {
    fetchData();
  } else {
    handleErrorMessage('check your iternet connection');
  }
})();
