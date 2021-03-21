const express = require("express");
const methodOverride = require("method-override");
const app = express();
const Recipe = require("./views/models/tacos-and-beer.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/recipes", (req, res) => {
  res.render("index.ejs", {
    recipes: Recipe
  });
});

app.get("/recipes/new", (req, res) => {
  res.render("new.ejs", {});
});

app.post("/recipes", (req, res) => {
  console.log("req", req);
  console.log("body", req.body);
  const body = req.body;
  body.equipment = req.body.equipment.split(", ");
  body.ingredients = req.body.ingredients.split(", ");
  body.preparation = req.body.preparation.split(", ");
  Recipe.push(body);
  res.redirect("/recipes");
});

app.get("/recipes/:id", (req, res) => {
  res.render("show.ejs", {
    recipe: Recipe[req.params.id],
    id: req.params.id
  });
});

app.delete("/recipes/:id", (req, res) => {
  console.log("trying to delete");
  Recipe.splice(req.params.id, 1);
  res.redirect("/recipes");
});

app.get("/recipes/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    recipe: Recipe[req.params.id],
    id: req.params.id
  });
});

app.put("/recipes/:id", (req, res) => {
  console.log(req);
  Recipe[req.params.id].name = req.body.name;
  Recipe[req.params.id].creator = req.body.creator;
  Recipe[req.params.id].date = req.body.date;
  Recipe[req.params.id].image = req.body.image;
  Recipe[req.params.id].description = req.body.description;
  Recipe[req.params.id].length = req.body.length;
  Recipe[req.params.id].yield = req.body.yield;
  Recipe[req.params.id].equipment = req.body.equipment.split(", ");
  Recipe[req.params.id].ingredients = req.body.ingredients.split(", ");
  Recipe[req.params.id].preparation = req.body.preparation.split(", ");
  res.redirect("/recipes");
});

app.listen(3000);
