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


// --- TESTING ---

// Add books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);

console.log("📚 Library Before Edit:");
console.log(myLibrary);

// Edit first book
const hobbitID = myLibrary[0].id;
editBookInLibrary(hobbitID, "The Hobbit (Edited)", "J.R.R. Tolkien", 300, false);

console.log("✏️ Library After Edit:");
console.log(myLibrary);

// Remove second book
const duneID = myLibrary[1].id;
removeBookFromLibrary(duneID);

console.log("❌ Library After Delete:");
console.log(myLibrary);


const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
});
