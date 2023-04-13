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
//Book data box
const dataTitle = document.querySelector("#title");
const dataAuthor = document.querySelector("#author");
const dataPages = document.querySelector("#pages");
const dataCompleted = document.querySelector("#completed");
const listBookTitle = document.querySelector(".listBookTitle");
const editBtn = document.querySelector("#editBtn");
const trashBtn = document.querySelector("#trashBtn");

//EVENT HANDLERS
let toBeEdited;
newBook_btn.addEventListener("click", (event) => {
  toBeEdited = false;
  openPopup();
});
close_btn.addEventListener("click", () => {
  closePopup();
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
  let title = formTitle.value;
  let author = formAuthor.value;
  let pages = formPages.value;
  let read = formRead.checked;

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  newBookForm.reset();

  createLibraryList();
  let selectedTitle = document.querySelector(`[listtitle="${title}"]`);
  selectedTitle.click();
  selectedTitle.focus();
}
function addEditedBookToLibrary() {
  let title = formTitle.value;
  let author = formAuthor.value;
  let pages = formPages.value;
  let read = formRead.checked;

  newBook = new Book(title, author, pages, read);
  myLibrary.splice(currentIndex, 1, newBook); //replace old book in array with edited one
  currentIndex = null;
  newBookForm.reset();

  createLibraryList();
  let selectedTitle = document.querySelector(`[listtitle="${title}"]`);
  selectedTitle.click();
  selectedTitle.focus();
}

//OPEN POPUP
function openPopup() {
  newBook_btn.disabled = true;
  editBtn.disabled = true;
  trashBtn.disabled = true;
  newBook_btn.style.display = "none";
  popupForm.style.display = "grid";
  popup_btns.style.display = "flex";
  formTitle.focus();
}
//CLOSE POPUP
function closePopup() {
  clearForm();
  newBook_btn.style.display = "grid";
  popupForm.style.display = "none";
  popup_btns.style.display = "none";
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
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.checked = false;
  titleValidate.textContent = "";
  authorValidate.textContent = "";
  pagesValidate.textContent = "";

  newBook_btn.style.display = "grid";
  popupForm.style.display = "none";
  popup_btns.style.display = "none";
  newBook_btn.disabled = false;
  editBtn.disabled = false;
  trashBtn.disabled = false;
}

function validate() {
  if (formTitle.value == "" || formAuthor.value == "" || formPages.value <= 0) {
    validateTitle();
    validateAuthor();
    validatePages();
    return false;
  } else {
    //editContinue = true;
    if (toBeEdited == false) {
      addBookToLibrary();
      clearForm();
    } else if (toBeEdited == true) {
      addEditedBookToLibrary();
      clearForm();
    }
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
    var indexNum = i;

    listIcon.setAttribute("src", "././imgs/nier.svg");
    listIcon.classList.add("listIcon");
    iconDiv.appendChild(listIcon);
    iconDiv.classList.add("iconDiv");
    listBookTitle.appendChild(document.createTextNode(myLibrary[i].title));
    listBookTitle.classList.add("listBookTitle");
    listBookTitle.setAttribute("id", "listBookTitle");
    titleDiv.appendChild(iconDiv);
    titleDiv.appendChild(listBookTitle);
    listBookTitle.setAttribute("tabindex", "0");
    listBookTitle.addEventListener("onclick", focus());
    listBookTitle.setAttribute("listTitle", myLibrary[i].title);
    listBookTitle.setAttribute("listAuthor", myLibrary[i].author);
    listBookTitle.setAttribute("listPages", myLibrary[i].pages);
    listBookTitle.setAttribute("listCompleted", myLibrary[i].haveRead);
    listBookTitle.setAttribute("arrayIndex", indexNum);
    titleDiv.classList.add("titleDiv");
    titleDiv.setAttribute("tabindex", "0");
    titleDiv.setAttribute("id", "titleDiv");
    titleDiv.addEventListener("onclick", focus());
    titleList.appendChild(titleDiv);
  }
  console.clear();
  for (i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].title);
  }
}

//SORT MYLIBRARY ARRAY
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

//Apply clicked button title information to the information container
document.body.addEventListener("click", function (event) {
  if (event.target.id == "listBookTitle") {
    dataTitle.textContent = event.target.getAttribute("listtitle");
    dataAuthor.textContent = event.target.getAttribute("listauthor");
    dataPages.textContent = event.target.getAttribute("listpages");
    dataCompleted.textContent = event.target.getAttribute("listcompleted");
    currentIndex = parseInt(event.target.getAttribute("arrayindex"));
    //selectedTitle = event.target.getAttribute("listtitle");
  }
});

//Event to display book info in the data container on click
editBtn.addEventListener("click", () => {
  toBeEdited = true;
  if (typeof currentIndex == "number") {
    formTitle.value = myLibrary[currentIndex].title;
    formAuthor.value = myLibrary[currentIndex].author;
    formPages.value = myLibrary[currentIndex].pages;
    formRead.checked = myLibrary[currentIndex].haveRead;
    openPopup();
  }
});
//Delete book info in data container on click
trashBtn.addEventListener("click", () => {
  if (typeof currentIndex == "number") {
    let currentElement = document.querySelector(
      `[arrayIndex="${currentIndex}"]`
    );
    currentElement.remove();
    myLibrary.splice(currentIndex, 1);
    dataTitle.textContent = "";
    dataAuthor.textContent = "";
    dataPages.textContent = "";
    dataCompleted.textContent = "";
    currentIndex = null;
  }
});

function populateLibrary() {
  newBook1 = new Book("S King", "It", 1600, true);
  myLibrary.push(newBook1);
  newBook2 = new Book("J Steinbeck", "East of Eden", 1200, true);
  myLibrary.push(newBook2);
  newBook3 = new Book("G Martin", "ASOIAF", 800, false);
  myLibrary.push(newBook3);
  createLibraryList();
}

populateLibrary();
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
