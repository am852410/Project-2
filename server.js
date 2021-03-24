const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
// Method-Override package
const methodOverride = require("method-override");

// this will parse the data and create the "req.body" object
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// req.body = {
//   username: "Antonio",
//   password: "Mendoza"
// };

// Set up Database ==========
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODBURI;

const db = mongoose.connection;

const Recipe = require("./views/models/recipe.js");

mongoose.connect(
  mongoURI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("database connection checked");
  }
);

db.on("error", err => {
  console.log("ERROR: ", err);
});
db.on("connected", () => {
  console.log("mongo connected");
});
db.on("disconnected", () => {
  console.log("mongo disconnected");
});

app.get("/recipes", (req, res) => {
  Recipe.find({}, (error, allRecipes) => {
    res.render("index.ejs", {
      recipes: allRecipes
    });
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

  Recipe.create(body, (error, createdRecipe) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(createdRecipe);
    }
  });
  // Recipe.push(body);
  res.redirect("/recipes");
});

app.get("/recipes/:id", (req, res) => {
  // recipe: Recipe[req.params.id],
  // id: req.params.id
  console.log("req.params.id", req.params.id);
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    console.log(foundRecipe);
    res.render("show.ejs", {
      recipe: foundRecipe
      // res.send(foundRecipe)
    });
  });
});

app.delete("/recipes/:id", (req, res) => {
  console.log("trying to delete");
  Recipe.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/recipes");
  });
  //Recipe.splice(req.params.id, 1);
});

app.get("/recipes/:id/edit", (req, res) => {
  // res.render("edit.ejs", {
  //   recipe: Recipe[req.params.id],
  //   id: req.params.id
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    console.log(foundRecipe);
    res.render("edit.ejs", {
      recipe: foundRecipe
      // res.send(foundRecipe)
    });
  });
});

app.put("/recipes/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log("type of", typeof req.body.image);

  req.body.equipment = req.body.equipment.split(", ");
  req.body.ingredients = req.body.ingredients.split(", ");
  req.body.preparation = req.body.preparation.split(", ");
  console.log("req 2", req.body);
  Recipe.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    console.log("updated model", updatedModel);
    console.log("err", err);
    return res.redirect("/recipes");
    res.send(updatedModel);
  });
});

app.listen(PORT, () => {
  console.log("server is listening");
});
