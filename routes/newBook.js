const express = require("express");
const router = express.Router();

// load Book model
const Book = require("../models").Book;

/**
 * @GET show add book form to user
 */
router.get("/", (req, res) => {
  res.render("NewBook");
});

/**
 * @post save new book to the server
 */
router.post("/register", (req, res, next) => {
  // check if the book already exists in the server
  Book.findOne({ where: { title: req.body.title } }).then(book => {
    if (book) {
      // if already such book, give user an alert
      res.render("NewBook", { alert: "This book already exists in the shelf" });
    } else {
      // if not, const and append the newbook to the server, refresh the page and tell user book is added
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
      };
      Book.create(newBook)
        .then(() => {
          res.render("NewBook", {
            //inform the user that the book is added to the database
            alert: "Book successfully added to the library"
          });
        })
        .catch(err => {
          // if userform fails server-side validation, inform the user
          if (err.name === "SequelizeValidationError") {
            res.render("newBook", {
              book: Book.build(req.body),
              err: err.errors
            });
          } else {
            // otherwise if server error, throw the error
            res.render("error");
          }
        });
    }
  });
});

module.exports = router;
