const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/**
 * @GET redirect to /books
 */
router.get("/", (req, res) => res.redirect("/books"));

/**
 * @GET show all books currently in database, ordered by cration date
 */
router.get("/books", (req, res) => {
  Book.findAll({ order: [["createdAt", "DESC"]] }).then(books => {
    res.render("index", { books });
  });
});

module.exports = router;
