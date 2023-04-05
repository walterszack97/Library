//GET DOM ELEMENTS
//header
const newBook_btn = document.querySelector(".add_btn");
const newInput_popup = document.querySelector(".newBookInput");
const popupForm = document.querySelector(".popup");
const formSubmit = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("#newBook_Form");
//main
const titleList = document.querySelector("#titleList");
const bookshelfItems = document.querySelector("#bookshelfItems");
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
  popupForm.style.display = "grid";
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
  addBooksToShelf();
}

//VALIDATE NEW BOOK FORM, SUBMIT AND CLEAR FORM
function validateTitle() {
  if (formTitle.value == "") {
    titleValidate.textContent = "Enter a title";
  } else {
    titleValidate.textContent = "";
  }
}
function validateAuthor() {
  if (formAuthor.value == "") {
    authorValidate.textContent = "Enter an author";
  } else {
    authorValidate.textContent = "";
  }
}
function validatePages() {
  if (formPages.value <= 0) {
    pagesValidate.textContent = "Pages must be > 0";
  } else {
    pagesValidate.textContent = "";
  }
}

function clearForm() {
  formTitle.textContent = "";
  formAuthor.textContent = "";
  formPages.textContent = "";
  formRead.textContent = "";

  newBook_btn.style.display = "grid";
  popupForm.style.display = "grid";
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
function addBooksToShelf() {
  while (bookshelfItems.hasChildNodes()) {
    bookshelfItems.removeChild(bookshelfItems.firstChild);
  }

  for (i = 0; i < myLibrary.length; i++) {
    var bookshelfItem = document.createElement("div");
    bookshelfItem.classList.add("bookshelfItem");
    bookshelfItem.appendChild(document.createTextNode(""));
    if (myLibrary[i].pages < 100) {
      bookshelfItem.style.height = "1rem";
    } else if (myLibrary[i].pages < 200) {
      bookshelfItem.style.height = "1.5rem";
    } else if (myLibrary[i].pages < 300) {
      bookshelfItem.style.height = "2rem";
    } else if (myLibrary[i].pages < 400) {
      bookshelfItem.style.height = "2.5rem";
    } else if (myLibrary[i].pages < 500) {
      bookshelfItem.style.height = "3rem";
    } else if (myLibrary[i].pages < 600) {
      bookshelfItem.style.height = "3.4rem";
    } else if (myLibrary[i].pages < 800) {
      bookshelfItem.style.height = "3.8rem";
    } else {
      bookshelfItem.style.height = "4rem";
    }

    bookshelfItems.appendChild(bookshelfItem);
  }
}
