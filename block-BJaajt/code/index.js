let img = document.querySelector('img');
let name = document.querySelector('h3');
let userName = document.querySelector('p');
let followingList = document.querySelector('.following');
let followersList = document.querySelector('.followers');
let input = document.querySelector('input');

function displayUI(data) {
  img.src = data.avatar_Url;
  console.log(data.avatar_Url);
  name.innerText = data.name;
  userName.innerText = data.login;
  followingImg(data.following);
  followersImg(data.following);
}

function followersImg(followers) {
  for (let i = 0; i < 5 && i < followers.length; i++) {
    let img = document.createElement('img');
    img.classList.add('item');
    img.src = followers[i].avatar_Url;
    followersList.append(img);
  }
}

function followingImg(following) {
  for (let i = 0; i < 5 && i < following.length; i++) {
    let img = document.createElement('img');
    img.classList.add('item');
    img.src = following[i].avatar_Url;
    followingList.append(img);
  }
}
function handleChange(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      console.log(userData);
      displayUI(userData);
    };

    xhr.onerror = function () {
      console.log('Something went wrong...');
    };
    xhr.send();
    event.target.value = '';
  }
}

input.addEventListener('keydown', handleChange);
