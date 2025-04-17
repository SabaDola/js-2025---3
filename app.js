// app.js
let userName = "";
let userArr = [];

const cont = document.querySelector('.cont');
const inp = document.querySelector('.inp');
const btn = document.querySelector('.btn');
const sel = document.querySelector('.sel');

// async await
// fetch GET default

// Promise  დაპირება 

//JSON  --  javascript object notation    
///  XML  

// console.log(fetch('https://reqres.in/api/users'))
// XHR

fetch('https://reqres.in/api/users')
  .then(resp => resp.json())
  .then(resp => renderUsers(resp.data));

function renderUsers(arr) {
  fillOptions(arr);
  userArr = arr;
  cont.innerHTML = '';
  arr.forEach((user, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${user.avatar}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${user.email}</h5>
        <p class="card-text">${user.first_name}</p>
        <p class="card-text">${user.last_name}</p>
        <button class="btn btn-danger" onclick="deleteUser (${index})">Delete</button>
      </div>
    `;
    cont.appendChild(card);
  });
}

function fillOptions(arr) {
  sel.innerHTML = '';
  arr.forEach((user, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = user.first_name;
    sel.appendChild(opt);
  });
}

sel.addEventListener('change', () => {
  const selectedValue = sel.value;
  const selectedUser  = userArr[selectedValue];

  cont.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${selectedUser .avatar}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${selectedUser .email}</h5>
        <p class="card-text">${selectedUser .first_name}</p>
        <p class="card-text">${selectedUser .last_name}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <button class="btn btn-danger" onclick="">Delete</button>
    </div>
  `;
});

inp.addEventListener('input', () => {
  const userFilteredArr = userArr
    .filter(item => item.first_name.toLowerCase().includes(inp.value.toLowerCase()) 
    || item.last_name.toLowerCase().includes(inp.value.toLowerCase()));

  cont.innerHTML = '';
  userFilteredArr.forEach((user, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${user.avatar}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${user.email}</h5>
        <p class="card-text">${user.first_name}</p>
        <p class="card-text">${user.last_name}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <button class="btn btn-danger" onclick="deleteUser (${index})">Delete</button>
    `;
    cont.appendChild(card);
  });
});

function deleteUser(index) {
  userArr.splice(index, 1);
  renderUsers(userArr);
}

