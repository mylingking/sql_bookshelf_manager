const express = require("express");
const sequelize = require("./models").sequelize;
const bodyParser = require("body-parser");
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

// listen on deployed env or local port 5000
const port = process.env.PORT || 8002;

// sync with model each time server spins off
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running at ${port}`));
});
