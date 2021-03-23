const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// server the model, telling how to organize the documents/data
const recipeSchema = new Schema({
  name: String,
  creator: String,
  date: String,
  description: String,
  length: String,
  yield: String,
  equipment: Array,
  ingredients: Array,
  preparation: Array,
  beer: String
});

// right here is when the collection/model gets created
const Recipe = model("Recipe", recipeSchema);
console.log(Recipe);
module.exports = Recipe;
