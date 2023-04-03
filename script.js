//GET DOM ELEMENTS
//header
const newBook_btn = document.querySelector(".add_btn");
const newInput_popup = document.querySelector(".newBookInput");
const popupForm = document.querySelector(".popup");
const formSubmit = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("#newBook_Form");
//main
const titleList = document.querySelector("#titleList");
//title, author, pages, read
const formTitle = document.querySelector("#input_title");
const formAuthor = document.querySelector("#input_author");
const formPages = document.querySelector("#input_pages");
const formRead = document.querySelector("#input_read");
//form validation
const titleValidate = document.querySelector("#titleValidate");
const authorValidate = document.querySelector("#authorValidate");
const pagesValidate = document.querySelector("#pagesValidate");

//EVENT HANDLERS
newBook_btn.addEventListener("click", (event) => {
  newBook_btn.style.display = "none";
  popupForm.style.display = "block";
});

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
  let author = formAuthor.value;
  let pages = formPages.value;
  let read = formRead.checked;

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  newBookForm.reset();
  createLibraryList();
}

//VALIDATE NEW BOOK FORM, SUBMIT AND CLEAR FORM
function validateTitle() {
  if (formTitle.value == "") {
    titleValidate.textContent = "Enter a title";
    formTitle.style.border = "solid 1px red";
  } else {
    titleValidate.textContent = "";
    formTitle.style.border = "solid 1px black";
  }
}
function validateAuthor() {
  if (formAuthor.value == "") {
    authorValidate.textContent = "Enter an author";
    formAuthor.style.border = "solid 1px red";
  } else {
    authorValidate.textContent = "";
    formAuthor.style.border = "solid 1px black";
  }
}
function validatePages() {
  if (formPages.value <= 0) {
    pagesValidate.textContent = "Pages must be > 0";
    formPages.style.border = "solid 1px red";
  } else {
    pagesValidate.textContent = "";
    formPages.style.border = "solid 1px black";
  }
}

function clearForm() {
  formTitle.textContent = "";
  formAuthor.textContent = "";
  formPages.textContent = "";
  formRead.textContent = "";

  newBook_btn.style.display = "grid";
  popupForm.style.display = "none";
}

function validate() {
  if (formTitle.value == "" || formAuthor.value == "" || formPages.value <= 0) {
    validateTitle();
    validateAuthor();
    validatePages();
    return false;
  } else {
    addBookToLibrary();
    clearForm();
  }
}

//CREATE LIST TO GET A SELECTION OF EACH BOOK IN THE LIBRARY
function createLibraryList() {
  var listBookTitle = document.querySelector(".listBookTitle");
  while (titleList.hasChildNodes()) {
    titleList.removeChild(titleList.firstChild);
  }

  for (i = 0; i < myLibrary.length; i++) {
    var listBookTitle = document.createElement("li");
    listBookTitle.classList.add("listBookTitle");
    listBookTitle.appendChild(document.createTextNode(myLibrary[i].title));
    titleList.appendChild(listBookTitle);

    console.log(
      myLibrary[i].title +
        "\n" +
        myLibrary[i].author +
        "\n" +
        myLibrary[i].haveRead
    );
  }
}

//BOOKSHELF TO GET A QUICK GLIMPSE OF BOOKS IN LIBRARY
