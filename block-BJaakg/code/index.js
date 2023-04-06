let ul = document.querySelector('ul');

let url = `https://www.anapioficeandfire.com/api/books`;

function renderBooks(books) {
  ul.innerHTML = '';
  books.forEach((book) => {
    let li = document.createElement('li');
    li.classList.add('flex-48');
    let h2 = document.createElement('h2');
    h2.innerText = book.name;
    let h4 = document.createElement('h4');
    h4.innerText = book.authors;
    let button = document.createElement('button');
    button.innerText = `Show Characters (${book.characters.length})`;
    li.append(h2, h4, button);
    ul.append(li);
  });
}
function openPopup() {
  popup.style.display = 'block';
}
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
  });
