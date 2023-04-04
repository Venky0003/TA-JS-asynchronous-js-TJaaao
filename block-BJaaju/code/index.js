let input = document.querySelector('input');
let searchImage;
let list = document.querySelector('.search-list');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.log('Something went wrong!');
  };
  xhr.send();
}

function handleDisplay(searchList) {
  list.innerHTML = '';
  let topTwelve = searchList.results.slice(0, 10);
  topTwelve.forEach((info) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = info.urls.small;
    li.append(img);
    list.append(li);
  });
  console.log(list);
}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    let value = input.value;
    searchImage = value.trim();
    const url = `https://api.unsplash.com/search/photos?query=${searchImage}&client_id=5qA6dGY_P-EYH23XxWerZknBffE5kyqUuyM-pP3xsVY`;
    fetch(url, handleDisplay);
    input.value = '';
  }
}

input.addEventListener('keydown', handleInput);
