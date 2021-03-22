const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
// Method-Override package
const methodOverride = require("method-override");

// this will parse the data and create the "req.body" object
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// req.body = {
//   username: "Antonio",
//   password: "Mendoza"
// };

// Set up Database ==========
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODBURI;

const db = mongoose.connection;

const Recipe = require("./views/models/tacos-and-beer.js");

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

// Set up Database ==========

const UserModel = require("./views/models/users");

app.get("/", (req, res) => {
  // User.create({
  //   username: req.body.username,
  //   password: req.body.password
  // });

  UserModel.find({}, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      res.send(foundUser);
    }
  });

  //res.send("mongo/mongoose review");
});

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
  Recipe[req.params.id].beer = req.body.beer;
  res.redirect("/recipes");
});

app.listen(PORT, () => {
  console.log("server is listening");
});
