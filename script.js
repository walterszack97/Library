//GET DOM ELEMENTS
//header
const newBook_btn = document.querySelector(".add_btn");
const close_btn = document.querySelector("#closeBtn");
const popup_btns = document.querySelector(".popupBtns");
const newInput_popup = document.querySelector(".newBookInput");
const popupForm = document.querySelector(".popup");
const formSubmit = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("#newBook_Form");
//main
const listContainer = document.querySelector("#listContainer");
const titleList = document.querySelector("#titleList");
const bookshelfItems = document.querySelector("#bookshelfItems");
const mainContainer = document.querySelector("#mainContainer");
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
  popup_btns.style.display = "flex";
  formTitle.focus();
});
close_btn.addEventListener("click", (event) => {
  clearForm();
  newBook_btn.style.display = "grid";
  popupForm.style.display = "none";
  popup_btns.style.display = "none";
});

//SORT BUTTONS
const alphaSortBtn = document.createElement("INPUT");
alphaSortBtn.setAttribute("type", "button");
alphaSortBtn.setAttribute("value", "Sort: Alphabetical");
alphaSortBtn.setAttribute("class", "sortBtn");
alphaSortBtn.setAttribute("id", "alphaSortBtn");
const completedSortBtn = document.createElement("INPUT");
completedSortBtn.setAttribute("type", "button");
completedSortBtn.setAttribute("value", "Sort: Completed");
completedSortBtn.setAttribute("class", "sortBtn");
completedSortBtn.setAttribute("id", "completedSortBtn");
const pagesSortBtn = document.createElement("INPUT");
pagesSortBtn.setAttribute("type", "button");
pagesSortBtn.setAttribute("value", "Sort: Pages");
pagesSortBtn.setAttribute("class", "sortBtn");
pagesSortBtn.setAttribute("id", "pagesSortBtn");

listContainer.prepend(alphaSortBtn);

alphaSortBtn.addEventListener("click", (event) => {
  listContainer.prepend(completedSortBtn);
  alphaSortBtn.remove();
  createLibraryList();
});
pagesSortBtn.addEventListener("click", (event) => {
  listContainer.prepend(alphaSortBtn);
  pagesSortBtn.remove();
  createLibraryList();
});
completedSortBtn.addEventListener("click", (event) => {
  listContainer.prepend(pagesSortBtn);
  completedSortBtn.remove();
  createLibraryList();
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
  //addBooksToShelf();
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
  titleValidate.textContent = "";
  authorValidate.textContent = "";
  pagesValidate.textContent = "";

  newBook_btn.style.display = "grid";
  popupForm.style.display = "none";
  popup_btns.style.display = "none";
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

  if (listContainer.firstElementChild.id == "alphaSortBtn") {
    sortAlpha();
  } else if (listContainer.firstElementChild.id == "completedSortBtn") {
    sortCompleted();
  } else {
    sortPages();
  }

  for (i = 0; i < myLibrary.length; i++) {
    var titleDiv = document.createElement("div");
    var listBookTitle = document.createElement("li");
    var listIcon = document.createElement("img");
    var iconDiv = document.createElement("div");
    listIcon.setAttribute("src", "././imgs/nier.svg");
    listIcon.classList.add("listIcon");
    iconDiv.appendChild(listIcon);
    iconDiv.classList.add("iconDiv");
    listBookTitle.appendChild(document.createTextNode(myLibrary[i].title));
    listBookTitle.classList.add("listBookTitle");
    titleDiv.appendChild(iconDiv);
    titleDiv.appendChild(listBookTitle);
    listBookTitle.setAttribute("tabindex", "0");
    listBookTitle.addEventListener("onclick", focus());
    titleDiv.classList.add("titleDiv");
    titleDiv.setAttribute("tabindex", "0");
    titleDiv.addEventListener("onclick", focus());
    titleList.appendChild(titleDiv);

    console.log(listContainer.firstElementChild.id);
  }
}

function sortAlpha() {
  myLibrary.sort((a, b) => {
    let ta = a.title.toLowerCase(),
      tb = b.title.toLowerCase();
    if (ta < tb) {
      return -1;
    }
    if (ta > tb) {
      return 1;
    }
    return 0;
  });
}
function sortPages() {
  myLibrary.sort((a, b) => {
    return a.pages - b.pages;
  });
}
function sortCompleted() {
  myLibrary.sort((a, b) => {
    return b.haveRead - a.haveRead;
  });
}

//BOOKSHELF TO GET A QUICK GLIMPSE OF BOOKS IN LIBRARY
/*function addBooksToShelf() {
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
}*/
