"use strict"

const myLibrary = {};

function Book(title, author, year, isRead, node) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isRead = isRead;
  this.node = node;
}

(function(){
  Book.prototype.toggleRead = function() {
    console.log('this, node is', this, this.node)
    this.isRead = !this.isRead;
    this.node.querySelector(".status span").innerHTML = (this.isRead ? "" : "not ");
  }

  Book.prototype.deleteBook = function() {
    this.node.remove();
    delete myLibrary[this.node.id];
  }
})();



function addBookToLibrary(title, author, year, isRead) {

  const getId = function() { //find smallest unused id number
    const idsUsed = new Set;
    Object.keys(myLibrary).forEach(e => idsUsed.add(Number(e.slice(4))));
    for (let i=1; i<=idsUsed.size+1; i++) {
      if (!idsUsed.has(i)) {
        return i;
      }
    }
  }
  const id=getId();

  const createCard = function() {
    const card = document.createElement("div")
    card.id = `book${id}`;
    card.classList.add("book-card");
    card.innerHTML =
        `<h4 class=\"title\">${title}</h4>`
      + `<p class=\"author\">By <span>${author}</span></p>`
      + `<p class=\"year\">Written in <span>${year}</span></p>`
      + `<p class=\"status\">I've <span>${isRead?"":"not "}</span>read this one</p>`
      + `<div class=\"button-wrapper\">`
      +   `<button class=\"read-toggle\" onclick=\"myLibrary[\`book${id}\`].toggleRead();\">Read it?</button>`
      +   `<button class=\"book-delete\" onclick=\"myLibrary[\`book${id}\`].deleteBook();\">&#128465;</button>`
      + `</div>`;
    return card;
  }
  const node = createCard();

  myLibrary[`book${id}`] = new Book(title, author, year, isRead, node);
  updateDisplay();
}

function updateDisplay() {
  const cards = document.querySelectorAll(".book-card");
  cards.forEach(e => e = e.id); //list of currently displayed ids
  const toDisplay = Object.keys(myLibrary).filter(e => !Array.from(cards).includes(e)); //ids of books to be added

  const bookContainer = document.querySelector(".book-container");
  for (let e of toDisplay) {
    bookContainer.appendChild(myLibrary[e].node);
  }
}

(function addModalListener() {
  const modalBtn = document.querySelector(".open-modal-button");
  modalBtn.addEventListener("click", e => {
    document.querySelector(".modal").style.display = "none"? "block" : "none"
  });
})();