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
      // if non exist, const and append the newbook to the server, refresh the page and tell user book is added
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
      };
      Book.create(newBook).then(book => {
        res.render("NewBook", {
          alert: "Book successfully added to the library"
        });
      });
    }
  });
});

module.exports = router;
