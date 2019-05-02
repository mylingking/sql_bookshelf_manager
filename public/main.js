// all books
const books = document.getElementsByClassName("books");
// ul to contain page number
const pagination = document.getElementsByClassName("pagination");
// books per page
const booksPerPage = 10;
// total page number
const totalPage = Math.ceil(books.length / booksPerPage);

// construct html for each li inside pagination ul
for (let i = 0; i < totalPage; i++) {
  const li = document.createElement("li");
  li.className += "page-button";
  li.textContent = i + 1;
  if (pagination[0]) {
    pagination[0].appendChild(li);
  }
}

// show the books on pages according to which page we are
const showPage = (start, end) => {
  // hide all the student
  for (let i = 0; i < books.length; i++) {
    books[i].style.display = "none";
  }
  // show only one page of student
  for (let j = start; j < end; j++) {
    if (books[j]) {
      books[j].style.display = "";
    }
  }
};

// click shows corresponding page, active the button clicked
if (pagination[0]) {
  pagination[0].addEventListener("click", event => {
    if (event.target.tagName == "LI") {
      const currentPage = event.target.textContent;
      // deactivate other button
      deactivate();
      event.target.className += " active";
      //determine the books to show based on the clicked page number
      //if its the last page, show books until it hits the last student
      if (parseInt(currentPage) === totalPage) {
        start = currentPage * 10 - 10;
        end = books.length;
        showPage(start, end);
        //otherwise, show the corresponding books
      } else {
        start = currentPage * 10 - 10;
        end = currentPage * 10;
        showPage(start, end);
      }
    }
  });
}

// deactivate other buttons when one button is clicked
// this function is called in the event listener
const deactivate = () => {
  let a = document.getElementsByClassName("active");
  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove("active");
  }
};

// give the first page button the class name 'active' to show it in active state when pages loads
if (pagination[0]) {
  pagination[0].firstElementChild.classList.add("active");
}

// call the show page function to show first 10 students when pages loads
showPage(0, 10);
