let input = document.querySelector('input');
let searchImage;
let list = document.querySelector('.search-list');

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => setTimeout(() => resolve(JSON.parse(xhr.response)),5000);
    xhr.onerror = () => setTimeout(() => reject('Something Went Wrong!'),5000);
    xhr.send();
  });
}

function handleDisplay(searchList) {
  list.innerHTML = '';
  let result = searchList.results
  result.forEach((info) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = info.urls.thumb;
    li.append(img);
    list.append(li);
  });
}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    let value = input.value;
    searchImage = value.trim();
    const url = `https://api.unsplash.com/search/photos?query=${searchImage}&client_id=5qA6dGY_P-EYH23XxWerZknBffE5kyqUuyM-pP3xsVY`;
    fetch(url)
    .then(handleDisplay) 
    .catch((error)=> alert('Check your network connection'))

    input.value = '';
  }
}

input.addEventListener('keydown', handleInput);
