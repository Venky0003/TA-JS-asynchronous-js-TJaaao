let img = document.querySelector('img');
let reload = document.querySelector('button');

reload.addEventListener( 'click',()=> {
let xhr = new XMLHttpRequest();
xhr.open('GET',`https://api.unsplash.com/photos/random/?client_id=CgmCLVvYbY_Hhg_O0bjv5Hp_2QKJxcoQIhXn1Qyw9U0`);
xhr.onload = function () {
    let image = JSON.parse(xhr.response);
    console.log(image);
    img.src = image.urls.small
}
xhr.onerror = function () {
    console.log('something went wrong ...')
}
xhr.send();
});

