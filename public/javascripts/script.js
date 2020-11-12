/******* PAGINATION *********/

// Select global variables
const books_per_page = 15;
const book_rows = document.getElementsByClassName('book-rows');

// Create the 'showPage' function to hide all of the books in the list except for the 15 you want to show.
const showPage = (list, page) => {

    // Establish a startIndex and an endIndex to restrict the number of books in a page.
    const startIndex = (page * books_per_page) - books_per_page;
    const endIndex = (page * books_per_page);

    // Looping through the 'list' of students to display just the choosen quantity and hide the rest.
    for (let i = 0; i < list.length; i++) {
        if(i >= startIndex && i < endIndex) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }

}

// Create the 'appendPageList' function to generate, append, and add functionality to the pagination buttons.
const appendPageList = (list) => {

    // Calculate the amount of pages needed. The result will be rounded up.
    const totalPages = Math.ceil(list.length / books_per_page);

    const mainPage = document.getElementById('index-content');
    const pageLink = document.createElement("nav");
    pageLink.classList.add("pagination");
    // Loop through the totalPages to create and append 'p' and 'a' elements with the variable starting point set to 1.
    for (let i = 1; i <= totalPages; i++) {

        const p = document.createElement("p");
        const a = document.createElement("a");
        a.textContent = [i];
        a.setAttribute('href', '#');
        a.classList = 'button';
        p.appendChild(a);
        pageLink.appendChild(p);      

    }  

    // Setting the class of the first pageLink to active.
    pageLink.firstElementChild.firstElementChild.classList.add("active");
    mainPage.appendChild(pageLink); 

}

// Check if there are any books to paginate.
if (book_rows.length > 0) {
    showPage(book_rows, 1);
    appendPageList(book_rows);
}

// Add click event handler
document.addEventListener ('click', (e) => {

    if(e.target.tagName === "A") {
        const apage = e.target;
        const pageNumber = apage.innerText;

        showPage(book_rows, pageNumber);
        // Add and remove active class when clicked.
        document.querySelector('a.active').classList.remove('active');
        a.classList.add('active');
    }

});




        