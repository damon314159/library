"use strict"

const myLibrary = {}; //stores book objects

function Book(title, author, year, isRead, node) { //constructor
  this.title = title;
  this.author = author;
  this.year = year;
  this.isRead = isRead;
  this.node = node;
}

(function(){ //IIFE to enable the buttons on a given book via prototype
  Book.prototype.toggleRead = function() { //allows user to change if they've read it
    this.isRead = !this.isRead;
    this.node.querySelector(".status span").innerHTML = (this.isRead ? "" : "not ");
  }

  Book.prototype.deleteBook = function() {
    this.node.remove();
    delete myLibrary[this.node.id];
  }
})();



function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isRead = document.getElementById("isRead").checked;
  // document.querySelector("form").reset();
  toggleModal(true);

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

  const updateDisplay = function() {
    const cards = document.querySelectorAll(".book-card");
    cards.forEach(e => e = e.id); //list of currently displayed ids
    const toDisplay = Object.keys(myLibrary).filter(e => !Array.from(cards).includes(e)); //ids of books to be added
  
    const bookContainer = document.querySelector(".book-container");
    for (let e of toDisplay) {
      bookContainer.appendChild(myLibrary[e].node);
    }
  }

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

  myLibrary[`book${id}`] = new Book(title, author, year, isRead, node); //construct new book in library
  updateDisplay(); //add node to page

  return false; //stops a reload
}


const toggleModal = (function() { //IIFE to initialize open/close buttons for the form modal, returns toggle func for use later
  const modal = document.querySelector(".modal");
  modal.style.display = "none" //hidden at start

  const toggleModal = function(clear=false) {
    modal.style.display = modal.style.display == "none"? "block" : "none";
    if (clear==true) {
      document.querySelector("form").reset();
    }
  };

  const modalBtn = document.querySelector(".open-modal-button");
  const modalClose = document.querySelector(".modal-close");
  modalBtn.addEventListener("click", ()=>toggleModal());
  modalClose.addEventListener("click", ()=>toggleModal(true));

  return toggleModal;
})();