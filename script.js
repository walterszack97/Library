let myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("A", "A", 1, true);
const book2 = new Book("B", "A", 2, false);
const book3 = new Book("C", "A", 3, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function printBooks() {
  for (i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].haveRead + "\n");
  }
}

printBooks();

//GET DOM ELEMENTS
const newBook_btn = document.querySelector(".add_btn");
const newInput_popup = document.querySelector(".newBookInput");
//EVENT HANDLERS
newBook_btn.addEventListener("click", (event) => {
  newInput_popup.style.display = "grid";
  newBook_btn.style.display = "none";
});
