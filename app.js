const express = require("express");
const sequelize = require("./models").sequelize;

const app = express();

app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

const routes = require("./routes/index");

app.use(routes);

// listen on deployed env or local port 5000
const port = process.env.PORT || 5000;

// sync with model each time server spins off
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running at ${port}`));
});
