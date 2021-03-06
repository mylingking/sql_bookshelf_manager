const express = require("express");
const router = express.Router({ mergeParams: true }); // passing mergeParams as parameter so this child route can access params
const Book = require("../models").Book;

/**
 * @GET redirect to /books
 */
router.get("/", (req, res) => {
  Book.findOne({
    where: { id: req.params.id }
  })
    .then(book => {
      if (book) {
        res.render("updateBook", { book });
      } else {
        res.render("notFound");
      }
    })
    .catch(err => {
      res.render("error");
    });
});

/**
 * @POST update the book
 */
router.post("/update", (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(book => {
      if (book) {
        const updatedBook = {
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          year: req.body.year
        };
        return book.update(updatedBook);
      }
    })
    .then(book => res.render("updateBook", { book, alert: "Update success" }))
    .catch(err => {
      // if userform fails server-side validation, inform the user
      if (err.name === "SequelizeValidationError") {
        res.render("updateBook", {
          book: Book.build({
            id: req.params.id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year
          }),
          err: err.errors
        });
      }
      // else {
      //   // otherwise if server error, throw the error
      //   res.render("error");
      // }
    });
});

/**
 * @POST delete the book
 */
router.post("/delete", (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(book => {
      //return a promise
      return book.destroy();
    })
    .catch(err => {
      res.render("error");
    })
    //once removed, redirect to book list
    .then(book => res.redirect("/"));
});

module.exports = router;
