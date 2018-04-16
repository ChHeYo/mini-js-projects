class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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

    showMessage(msg, type){
        const alert = document.createElement("div");
        alert.className = `alert ${type}`;
        alert.textContent = msg;
        document.querySelector(".container").insertBefore(alert, document.getElementById("book-form"));
        setTimeout(function(){
            alert.remove();
        }, 1000);
    }

    clearFields(target){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    deleteList(e){
        e.target.parentElement.parentElement.remove();
    }
}

class Store {
    static getBook(){
        let book;
        if (localStorage.getItem("books") === null){
            book = [];
        } else {
            book = JSON.parse(localStorage.getItem("books"));
        }
        return book;
    }

    static displayBook(){
        const bookList = Store.getBook();

        bookList.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static deleteBook(isbn){
        const books = Store.getBook();

        books.forEach(function(book, index){
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        
        localStorage.setItem("books", JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded", Store.displayBook());

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
        Store.addBook(book);
        ui.showMessage("New book added to the list", "success");
        ui.clearFields();
    }

    e.preventDefault();
})

document.getElementById("book-list").addEventListener("click", (e)=>{

    const ui = new UI();

    if (e.target.className === "delete"){
        ui.deleteList(e);
        ui.showMessage("The list was deleted", "success");
        Store.deleteBook(e.target.parentElement.previousElementSibling.textContent); // <a></a>
    }

    e.preventDefault();
})