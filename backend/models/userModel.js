const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  email: String,
  name: String,
  authMethod: String,
});

module.exports = mongoose.model("User", userSchema);
