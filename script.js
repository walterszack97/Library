//GET DOM ELEMENTS
const newBook_btn = document.querySelector(".add_btn");
const newInput_popup = document.querySelector(".newBookInput");
const popupForm = document.querySelector(".popup");
const formSubmit = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("#newBook_Form");
//title, author, pages, read
const formTitle = document.querySelector("#input_title");
const formAuthor = document.querySelector("#input_author");
const formPages = document.querySelector("#input_pages");
const formRead = document.querySelector("#input_read");

//FUNCTIONS
let myLibrary = [];
let newBook;

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary() {
  event.preventDefault();
  let title = formTitle.value;
  let author = formTitle.value;
  let pages = formTitle.value;
  let read = formTitle.value;

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  newBookForm.reset();
  printBooks();
}

function printBooks() {
  for (i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].haveRead + "\n");
  }
}

//EVENT HANDLERS
formSubmit.addEventListener("click", addBookToLibrary);
newBook_btn.addEventListener("click", (event) => {
  newBook_btn.style.display = "none";
  popupForm.style.display = "block";
});
