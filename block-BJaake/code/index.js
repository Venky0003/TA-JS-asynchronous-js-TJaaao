let input = document.querySelector('input');
let ul = document.querySelector('ul');

let dataPromise = fetch(
  `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
)
  .then((res) => res.json())
  .then((newsArt) => {
    newsArt.forEach((news) => {
      let li = document.createElement('li');
      li.classList.add('flex');
      let divOne = document.createElement('div');
      divOne.classList.add('flex-45');
      let img = document.createElement('img');
      img.src = news.imageUrl;
      divOne.append(img);
      let div = document.createElement('div');
      div.classList.add('flex-45');
      let h2 = document.createElement('h2');
      h2.innerText = news.title;
      let button = document.createElement('button');
      button.classList.add('site');
      button.innerText = news.newsSite;
      let buttonTwo = document.createElement('button');
      let readMore = document.createElement('a');
      readMore.href = news.url;
      readMore.target = '_blank';
      buttonTwo.classList.add('more');
      buttonTwo.innerText = 'Read More';
      buttonTwo.append(readMore);
      div.append(button, h2, buttonTwo);
      li.append(divOne, div);
      ul.append(li);
    });
  });
