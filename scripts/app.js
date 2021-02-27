// book object declaration
function Book(title, author, numPages) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.checkedIn = Boolean
}
// array of books in library
let myLibrary = [];


// variables
let myForm = document.getElementById('add-book-form'); // when tagging id, don't use . or # 
let checkInButtons = document.getElementsByClassName('book-buttons-in');
let checkOutButtons = document.getElementsByClassName('book-buttons-out');

// add a book to library
myForm.onsubmit = function () {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('author').value;
    let numPages = document.getElementById('numPages').value;
    createBook(title,author,numPages);
    addCheckOutListeners();
    addCheckInListeners();
    // return false to cancel page reload on submit event
    return false;
}  

// check a book out listeners
function addCheckOutListeners () {
    for (i=0; i< checkInButtons.length; i++) {
        checkInButtons[i].addEventListener('click', (e) => {
            checkOutBook(e);
            updateDisplay();
            return false;
        })
    }
}

// check a book back in listeners
function addCheckInListeners () {
    for (i=0; i< checkOutButtons.length; i++) {
        checkOutButtons[i].addEventListener('click', (e) => {
            console.log("Event Listener Worked");
            checkInBook(e);
            updateDisplay();
            return false;
        })
    }
}

// check out a book when Check Out is pressed
function checkOutBook(e) {
    // change CheckedIn to false
    // set checkedIn to false by returning the node in myLibrary with e.target.id = mylibrary.book-title and set checkedIn to false 
    myLibrary.filter(aBook => aBook.title == e.target.id)[0].checkedIn = false;
}

function checkInBook(e) {
    // similar to checkOutBook
    myLibrary.filter(aBook => aBook.title == e.target.id)[0].checkedIn = true;
}

// function to create a Book object
function createBook(title, author, numPages) {

    // create new book object
    const newBook = new Book(title, author, numPages);

    // add to libray
    myLibrary.push(newBook);

    // checked in by default
    newBook.checkedIn = true;

    // display on webpage
    updateDisplay();

    // add any new buttons to buttons array
    checkInButtons = Array.from(document.getElementsByClassName('book-buttons-in'));
    checkOutButtons = Array.from(document.getElementsByClassName('book-buttons-out'));
}

// function to add a book to the html page itself
function updateDisplay () {
    // clear page
    clearPage();

    // add books to page
    myLibrary.forEach(aBook => {

        if (aBook.checkedIn) {
            // add to Checked In list

            // create book div
            let myBook = document.createElement('div');
            let title = aBook.title;
            let author = aBook.author;
            let numPages = aBook.numPages;

            // add in before the test book
            const testBook = document.getElementById('test-book-in');
            document.getElementById('books-in').insertBefore(myBook, testBook);

            //add classes, text, styling
            myBook.classList.add('book');
            myBook.setAttribute('style', 'white-space: pre;')
            myBook.textContent  = `${title} by ${author}\r\nPage Count: ${numPages}`;

            // add button to check a book out
            let myButton = document.createElement('button');
            myBook.appendChild(myButton);
            myButton.textContent = "Check Out";     
            myButton.classList.add('book-buttons-in');
            myButton.setAttribute('id', `${title}`);
        } else if (!aBook.checkedIn) {
            // add to Checked Out list

            // create book div
            let myBook = document.createElement('div');
            let title = aBook.title;
            let author = aBook.author;
            let numPages = aBook.numPages;

            // add in before the test book
            const testBook = document.getElementById('test-book-out');
            document.getElementById('books-out').insertBefore(myBook, testBook);

            //add classes, text, styling
            myBook.classList.add('book');
            myBook.setAttribute('style', 'white-space: pre;')
            myBook.textContent  = `${title} by ${author}\r\nPage Count: ${numPages}`;

            // add button to check a book out
            let myButton = document.createElement('button');
            myBook.appendChild(myButton);
            myButton.textContent = "Check In";     
            myButton.classList.add('book-buttons-out');
            myButton.setAttribute('id', `${title}`);
        }

         // add any new buttons to buttons array
        checkInButtons = Array.from(document.getElementsByClassName('book-buttons-in'));
        checkOutButtons = Array.from(document.getElementsByClassName('book-buttons-out'));

        // add listeners
        addCheckInListeners();
        addCheckOutListeners();

        console.log(checkInButtons);
        console.log(checkOutButtons);
    });

}

function clearPage() {
    let div = document.getElementById('books-in');
    
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    div = document.getElementById('books-out');
    while(div.firstChild){
        div.removeChild(div.firstChild)
    }
}
