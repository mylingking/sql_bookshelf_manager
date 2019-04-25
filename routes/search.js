const express = require("express");
const router = express.Router({ mergeParams: true }); // passing mergeParams as parameter so this child route can access params
const Book = require("../models").Book;
const Sequelize = require("sequelize");
const Op = Sequelize.Op; //import search query tool

/**
 * @POST handle the search
 */
router.post("/", (req, res) => {
  Book.findAll({
    where: {
      //add multiple search criterias
      [Op.or]: [
        { title: { [Op.like]: `%${req.body.keyword}%` } },
        { author: { [Op.like]: `%${req.body.keyword}%` } },
        { genre: { [Op.like]: `%${req.body.keyword}%` } },
        { year: { [Op.like]: `%${req.body.keyword}%` } }
      ]
    }
  }).then(books => {
    res.render("index", { books });
  });
});

module.exports = router;
