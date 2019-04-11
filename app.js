const express = require("express");
const sequelize = require("./models").sequelize;
const bodyParser = require("body-parser");
const Book = require("./models").Book;
const _BOOKS = require("./seeders/dataApr-8-2019.json");

const app = express();

// use view engine as pug
app.set("view engine", "pug");

// create static
app.use(express.static(__dirname + "/public"));

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use routes
app.use("/", require("./routes/index"));
app.use("/books/new", require("./routes/newBook"));
app.use("/books/:id", require("./routes/update"));
app.use("/books/search", require("./routes/search"));

// 404 error handler
app.use((req, res) => {
  const err = new Error();
  err.status = 404;
  res.render("notFound", { error: err.status });
});

// listen on deployed env or local port 5000
const port = process.env.PORT || 5000;

// sync with model each time server spins off
sequelize
  .sync({
    // remove all data and repopulate database when it retarts
    force: true,
    // uncomment below line to see detailed queries
    logging: false
  })
  .then(() => {
    // populate database with a set of 100 books
    Book.bulkCreate(_BOOKS)
      .then(books => {
        console.log("\n100 initial books added\n");
      })
      .catch(err => {
        console.log(err);
      });
  })
  // spin off
  .then(() => {
    app.listen(port, () => console.log(`Server running at ${port}`));
  });
