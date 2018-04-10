// To-Do: 
// 1. Add localstorage support
// 2. making each-delete button appear on hover

// refractor the codes

// adding id to each new task created

let taskId = 0;

// drag and drop support

function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e){
    e.preventDefault();
}

function drop(e, element){
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    element.children[1].appendChild(document.getElementById(data));
}

// Adding delete buttons and adding listener to each

let toDoCols = document.getElementsByClassName("each-col");

for(let i = 0; i < toDoCols.length; i++){
    toDoCols[i].addEventListener('click', removeEach);
}

function removeEach(e) {
    console.log(e.target);
    if (e.target.classList.contains('delete-each-post')){
        e.target.parentElement.remove();
    }
}

// clear-all button

document.getElementById("clear-all").addEventListener('click', (e) => {
    let quickNote = document.getElementsByTagName('textarea');
    quickNote[0].value = '';
    
    let toDoCol1 = document.getElementById('to-do-col');
    let toDoCol2 = document.getElementById('to-do-col-2');
    let toDoCol3 = document.getElementById('to-do-col-3');

    toDoCol1.remove();
    toDoCol2.remove();
    toDoCol3.remove();

    e.preventDefault();
});

// adding new task

document.getElementById('add-new-task-form').addEventListener('submit', (e) => {
    let newTask = document.createElement('li');
    // const column1 = document.querySelector(".list-unstyled");
    const column1 = document.getElementById('to-do-col');
    const newTaskDetail = document.getElementById('new-task-detail');

    // probably good idea to make them ojbect so that i can have static methods
    // that counts the number of instances created

    newTask.className = 'to-do-box-1 pl-2 mt-1 mb-2 each-task';
    newTask.setAttribute("style", "background: '#4D648D'");
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("ondragstart", "drag(event)");
    newTask.id = "task" + taskId;
    newTask.textContent = newTaskDetail.value;

    const deleteBtn = document.createElement("a");
    deleteBtn.className = "btn btn-primary btn-sm delete-each-post";
    deleteBtn.textContent = "X";
    newTask.appendChild(deleteBtn);

    taskId++;

    column1.appendChild(newTask);
    newTaskDetail.value = '';
    

    e.preventDefault();
});