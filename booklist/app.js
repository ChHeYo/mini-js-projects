function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

UI.prototype.addBookToList = function(book){

    const booklist = document.getElementById("book-list");

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `

    booklist.appendChild(row);
}

UI.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

UI.prototype.showMessage = function(msg, type){
    const alert = document.createElement("div");
    alert.className = `alert ${type}`
    alert.textContent = msg;
    document.querySelector(".container").insertBefore(alert, document.getElementById("book-form"));
    setTimeout(function(){
        alert.remove();
    }, 1000);
}

UI.prototype.deletList = function(e){
    e.target.parentElement.parentElement.remove();
}

document.getElementById("book-form").addEventListener("submit", (e)=>{
    const title = document.getElementById("title").value;
          author = document.getElementById("author").value;
          isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);
    
    const ui = new UI();

    if (title === "" || author === "" || isbn === ""){
        ui.showMessage("Please fill in all fields", "error");
    } else {
        ui.addBookToList(book);
        ui.showMessage("New book added to the list", "success");
        ui.clearFields();
    }

    e.preventDefault();
})

document.getElementById("book-list").addEventListener("click", (e)=>{

    const ui = new UI();

    if (e.target.className === "delete"){
        ui.deletList(e);
        ui.showMessage("The list was deleted", "success");
    }

    e.preventDefault();
})