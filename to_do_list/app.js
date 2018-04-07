// define Ui vars
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addTask = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// abstraction of loading eventlisteners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTask);
    taskForm.addEventListener('submit', addTaskNow);
    addTask.addEventListener('click', removeEachTask);
    clearTask.addEventListener('click', clearEverything);
    filter.addEventListener('keyup', filterTask);
}

function getTask(){
    let addToList;
    let checkEmpty = localStorage.getItem('tasks');
    if (checkEmpty === null){
        addToList = [];
    } else {
        addToList = JSON.parse(localStorage.getItem('tasks'));
    }
    addToList.forEach(function(addThis){
        const task = document.createElement('li');
        task.className = 'collection-item';
        task.appendChild(document.createTextNode(addThis));

        const deleteBtn = document.createElement('a');
        deleteBtn.className = 'delete-item secondary-content';
        deleteBtn.textContent = 'X';
        deleteBtn.setAttribute('style', 'cursor: pointer');

        task.appendChild(deleteBtn);
        addTask.appendChild(task);
    }) 
}

// create function add task (inside the function above)

function addTaskNow(e) {
    // console.log(taskInput.value);
    if (taskInput.value === ''){
        alert('Task is empty');
    } else {
        const task = document.createElement('li');
        task.className = 'collection-item';
        task.appendChild(document.createTextNode(taskInput.value));

        const deleteBtn = document.createElement('a');
        deleteBtn.className = 'delete-item secondary-content';
        deleteBtn.textContent = 'X';
        deleteBtn.setAttribute('style', 'cursor: pointer');

        task.appendChild(deleteBtn);
        addTask.appendChild(task);
        addToLocalStorage(taskInput.value);
        taskInput.value = '';
    }

    e.preventDefault();
}

function addToLocalStorage(task){
    let addToList;
    let checkEmpty = localStorage.getItem('tasks');
    if (checkEmpty === null){
        addToList = [];
    } else {
        addToList = JSON.parse(localStorage.getItem('tasks'));
    }
    addToList.push(task);
    localStorage.setItem('tasks', JSON.stringify(addToList));

}

function removeEachTask(e) {
    if (e.target.classList.contains('delete-item')){
        e.target.parentElement.remove();
        removeFromLocalStorge(e.target.parentElement.firstChild.textContent);
    }
    e.preventDefault();
}

function removeFromLocalStorge(toRemove){
    let addToList;
    let checkEmpty = localStorage.getItem('tasks');
    if (checkEmpty === null){
        addToList = [];
    } else {
        addToList = JSON.parse(localStorage.getItem('tasks'));
    }
    addToList.forEach(function(task, index){
        if (task === toRemove){
            addToList.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(addToList));
}

function clearEverything(e) {

    addTask.remove();
    localStorage.clear();

    e.preventDefault();
}

function filterTask(e) {
    
    let filterBy = e.target.value.toLowerCase();

    const arrayOfTasks = document.querySelectorAll('.collection-item');
    
    arrayOfTasks.forEach(function(task){
        let find = task.firstChild.textContent;
        if (find.toLowerCase().indexOf(filterBy) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })

    console.log(filterBy);
}