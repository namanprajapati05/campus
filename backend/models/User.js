const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  roll: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
