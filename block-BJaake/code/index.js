let select = document.querySelector('select');
let ul = document.querySelector('ul');
let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let allNews = [];

function renderNews(newsList) {
    ul.innerHTML = "";
  newsList.forEach((news) => {
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
    readMore.append(buttonTwo);
    div.append(button, h2, readMore);
    li.append(divOne, div);
    ul.append(li);
  });
}

function displayOptions(sources) {
  sources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option);
  });
}

fetch(url)
  .then((res) => res.json())
  .then((newsList) => {
    allNews = newsList
    renderNews(newsList);
    let allSources = Array.from(new Set(newsList.map((n) => n.newsSite)));
    displayOptions(allSources);
  });

  select.addEventListener('change',(event)=>{
    let source = event.target.value.trim();
    if(source){
     var filteredNews = allNews.filter((news)=> news.newsSite === source);
    }
    else {
        filteredNews = allNews;
    }
    renderNews(filteredNews)
  })
