const express = require("express");
const app = express();
const Recipe = require("./views/models/tacos-and-beer.js");
app.use(express.static("public"));

app.get("/recipes", (req, res) => {
  res.render("index.ejs", {
    recipes: Recipe
  });
});

app.get("/recipes/:id", (req, res) => {
  console.log({
    recipe: Recipe[req.params.id],
    id: req.params.id,
    Recipe
  });
  res.render("show.ejs", {
    recipe: Recipe[req.params.id],
    id: req.params.id
  });
});
app.listen(3000);
