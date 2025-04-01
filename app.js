const myLibrary = [];

  // the constructor...
function Book(title, author, numPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, numPages, read) {
    const newBook = new Book(title, author, numPages, read);  
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
    // Returns the index of the first element in the array is true, and -1 otherwise
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
      myLibrary.splice(index, 1); // remove 1 book at that index
    }
}

function editBookInLibrary(id, title, author, numPages, read) {
    myLibrary.forEach((book, index) => {
        if (id == book.id){
            book.title = title;
            book.author = author;
            book.numPages = numPages;
            book.read = read;
        }
    });
}

function toggleRead(){

}

// Passes form data into addBooktoLibrary
function addFormtoLibrary(){
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("numPages");
    const status = formData.get("status");
    addBookToLibrary(title, author, pages, status)

}

// Adds a book card to grid
function addBookCard (){
    
    const lastBook = myLibrary[myLibrary.length-1];
    
    // Add card
    const library = document.querySelector(".library");
    const card = document.createElement("div");
    card.classList.add("book-card");
    library.appendChild(card);

    // Add book title
    const cardHeader = document.createElement("h3");
    cardHeader.textContent = lastBook.title;
    card.appendChild(cardHeader);

    // Add book author
    const cardAuthor = document.createElement("p");
    cardAuthor.innerHTML = "<strong> Author:  </strong>" + lastBook.author;
    card.appendChild(cardAuthor);

    // Add book pages
    const cardPages = document.createElement("p");
    cardPages.innerHTML = "<strong> Pages:  </strong>" + lastBook.numPages;
    card.appendChild(cardPages);

    // Add if book read lastBook.read;
    const cardRead = document.createElement("p");
    cardRead.innerHTML = "<strong> Read:  </strong>" 

    const toggle = document.createElement("label");
    toggle.classList.add("switch")
    const toggleInput = document.createElement("input")
    toggleInput.setAttribute("type","checkbox");

    const slider = document.createElement("span");
    slider.classList.add("slider", "round")
    
    card.appendChild(cardRead);
    cardRead.appendChild(toggle);
    toggle.appendChild(toggleInput)
    toggle.appendChild(slider)

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Remove"
    deleteButton.addEventListener("click", (e) => {
        card.remove();
        removeBookFromLibrary(lastBook.id);
    })
    card.appendChild(deleteButton);
}

// Form event listener
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault(); // stops form from actually submitting
        addFormtoLibrary();
        addBookCard();
  });

