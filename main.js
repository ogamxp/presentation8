let API = 'https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/department'
let box = document.querySelector('.box')
let newTitle = document.querySelector('.newTitle')
let newDescription = document.querySelector('.newDescription')
let btnAdd = document.querySelector('.btnAdd')
let editTitle = document.querySelector('.editTitle')
let editDescription = document.querySelector('.editDescription')
let btnEdit = document.querySelector('.btnEdit')

var modal = document.getElementById("myModal");
var modall = document.getElementById("myModall");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[1];
var span1 = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

span1.onclick = function() {
  modall.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal || event.target == modall) {
    modal.style.display = "none";
    modall.style.display = "none";
  }
}

async function get () {
    try {
        let {data} = await axios.get(API)
        show(data)
    }

    catch (error) {
        console.error(error)
    }
}

async function newTodo () {
    let newObj = {
        title: newTitle.value,
        description: newDescription.value,
        completed: false,
    }

    try {
        let {data} = await axios.post(API, newObj)
        modal.style.display = 'none'
    }
    
    catch (error) {
        console.error(error);
    }

    get()
}

btnAdd.onclick = newTodo

async function doneTodo (e) {
    let obj = {
        title: e.title,
        description: e.description,
        completed: !e.completed,
    }
    try {
        let {data} = await axios.put(`${API}/${e.id}`, obj)
        get()
    }
    catch (error) {
        console.error(error);
    }
}

async function deleteTodo (id) {
    try {
        let {data} = await axios.delete(`${API}/${id}`)
    }
    
    catch (error) {
        console.error(error);
    }

    get()
}

let idx = null
async function editTodo (e) {
    idx = e.id
    editTitle.value = e.title
    editDescription.value = e.description
    
    modall.style.display = 'block'
}

async function applyEdit (id) {
    let newObj = {
        title: editTitle.value,
        description: editDescription.value,
        completed: false,
    }
    
    try {
        let {data} = await axios.put(`${API}/${idx}`, newObj)
    }
    
    catch (error) {
        console.error(error);
    }
    modall.style.display = 'none'
    get()
}

btnEdit.onclick = applyEdit

function show (data) {
    box.innerHTML = ''
    data.forEach((e) => {
        let div = document.createElement('div')
        let h1 = document.createElement('h1')
        h1.innerHTML = e.title
        if (e.completed) {
            h1.style.textDecoration = 'line-through'
        }
        
        let p = document.createElement('p')
        p.innerHTML = e.description
        
        let iconEdit = document.createElement('i')
        iconEdit.classList.add('fa-solid')
        iconEdit.classList.add('fa-pen')
        iconEdit.style.color = 'green'
        iconEdit.style.cursor = 'pointer'
        iconEdit.onclick = () => {
            editTodo(e)
        }
        
        let iconDelete = document.createElement('i')
        iconDelete.classList.add('fa-solid')
        iconDelete.classList.add('fa-trash')
        iconDelete.style.color = 'red'
        iconDelete.style.cursor = 'pointer'
        iconDelete.onclick = () => {
            deleteTodo(e.id)
        }
        
        let done = document.createElement('input')
        done.type = 'checkbox'
        done.checked = e.completed
        done.style.cursor = 'pointer'
        done.onclick = () => {
            doneTodo(e)
        }

        div.appendChild(h1)
        div.appendChild(p)
        div.appendChild(iconEdit)
        div.appendChild(iconDelete)
        div.appendChild(done)
        box.appendChild(div)
    });
}

get()