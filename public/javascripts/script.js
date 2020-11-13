/******* PAGINATION *********/

// Select global variables
const books_per_page = 12;
const book_rows = document.getElementsByClassName('book-rows');

// Create the 'showPage' function to hide all of the books in the list except for the 15 you want to show.
const showPage = (list, page) => {

    // Establish a startIndex and an endIndex to restrict the number of books in a page.
    const startIndex = (page * books_per_page) - books_per_page;
    const endIndex = (page * books_per_page);

    // Looping through the 'list' of books to display just the choosen quantity and hide the rest.
    for (let i = 0; i < list.length; i++) {
        if(i >= startIndex && i < endIndex) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }

}

// Create the 'appendPageList' function to generate, append and add functionality to the pagination buttons.
const appendPageList = (list) => {

    // Calculate the amount of pages needed.
    const totalPages = Math.ceil(list.length / books_per_page);
    const nav = document.createElement('nav');
    const pageDiv = document.getElementById('index-content');
    nav.className = 'pagination';

    // Loop through totalPages to create 'li' and 'a' elements with the variable starting point set to 1.
    for(let i = 1; i <= totalPages; i++) {
        const LI = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.textContent = [i];
        LI.appendChild(anchor);
        nav.appendChild(LI);
        pageDiv.appendChild(nav);

        // Set the class of the first page anchor to 'active'.
        if (anchor.textContent == 1) {
            anchor.className = 'active';
        }
        // Add a 'click' event to the anchor.
        anchor.addEventListener('click', (e) => {
           e.preventDefault();
           showPage(list, i);
        // Add and remove the 'active' class when is clicked.
           document.querySelector('a.active').classList.remove('active');
           const clickedAnchor = e.target;
           clickedAnchor.classList.add('active');
        })

    }
        
}

// If statement to show the list results.
if (book_rows.length > 0) {
    showPage(book_rows, 1);
    appendPageList(book_rows);
}

