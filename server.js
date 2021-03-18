const express = require("express");
const app = express();
const Recipe = require("./models/tacos-and-beer.js");

app.get("/recipes", (req, res) => {
  res.render("index.ejs", {
    recipes: Recipe
  });
});

app.listen(3000);
