const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// server the model, telling how to organize the documents/data
const userSchema = new Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true }
);

// right here is when the collection/model gets created
const User = model("User", userSchema);
console.log(User);
module.exports = User;
