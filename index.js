console.log("this is index.js");
showbook();
// todos
// 1.store all data to the local storage
// 2.give another column as an option to delete the book
// 3. add a scrollbar to the view

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type
}

// Display Constructor
function Display() {

}
// Add methods to Display prototype
Display.prototype.add = function (book) {
    let uiString = document.getElementById("tableBody");
    if (uiString.innerHTML == null) {
        bookinfo = "";
    }
    else {
        bookinfo = uiString.innerHTML;
    }

    bookinfo += `<tr>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.type}</td>
    </tr>`
    uiString.innerHTML = bookinfo;

}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}
Display.prototype.validate = function (book) {
    if (book.name.length >= 1 && book.author.length >= 1 && book.type != null) {
        return true;
    }
    else {
        return false;
    }
}
Display.prototype.show = function (outcome) {
    document.getElementById("message").innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong> ${outcome} ;
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    setTimeout(function () {
        document.getElementById("message").innerHTML = null;
    }, 2000)
}

function showbook() {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    booksObj.forEach(element => {
        let uiString = document.getElementById("tableBody");
        if (uiString.innerHTML == null) {
            bookinfo = "";
        }
        else {
            bookinfo = uiString.innerHTML;
        }

        bookinfo += `<tr>
       <td>${element.name}</td>
       <td>${element.author}</td>
       <td>${element.type}</td>
     </tr>`
        uiString.innerHTML = bookinfo;


    });
}
// Add submit event listener to library form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
    console.log("hello");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // console.log(name);
    // console.log(author);
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        booksObj.push(book);
        localStorage.setItem("books",JSON.stringify(booksObj));
        display.add(book);
        display.clear();
        display.show("You successfully added this book");

    }
    else {
        display.show("Sorry you cannot add this");
    }

    e.preventDefault();

}