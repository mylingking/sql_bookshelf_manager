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
      return book.update(req.body);
    })
    .catch(err => {
      res.render("error");
    })
    .then(book => res.render("updateBook", { book, alert: "Update success" }));
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
