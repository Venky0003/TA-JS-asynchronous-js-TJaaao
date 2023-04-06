let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Hello'), 1000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise'), 2000);
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('.all'), 3000);
});
let promise4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('set'), 4000);
});

let all = Promise.all([promise1, promise2, promise3, promise4]);

all.then((value) => console.log(value)).catch((error) => console.log(error));

let arrNames = [
  'getify',
  'gaearon',
  'AArnott',
  'subtleGradient',
  'piranha',
  'sophiebits',
];

let allUsers = Promise.all(
  arrNames.map((user) =>
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((user) =>
        console.log(`${user.name} Github Followers ${user.followers}`)
      )
  )
);

let urls = [`https://random.dog/woof.json`, `https://aws.random.cat/meow`];
Promise.race(urls.map(url => fetch(url)))
.then((res) => res.json())
.then(console.log)
.catch((error)=> console.log(error))


const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let allSet = Promise.allSettled([one, two, three]).then(console.log)

let all1 = Promise.all([one, two, three]).then(console.log);



Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('Arya'), 1000);
    }),
    'Sam',
    { name: 'John' },
  ]).then(console.log);

//it will take 1001ms to resolve it
//output  
// ['Arya', 'Sam', 
// {name: 'John'}]



