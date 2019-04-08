const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.redirect("/books"));

router.get("/books", (req, res) => res.render("index"));

router.get("/book_detail", (req, res) => res.render("updateBook"));

module.exports = router;
