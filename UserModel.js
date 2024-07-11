const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The name is required"],
  },
  firstName: {
    type: String,
    required: [true, "The name is required"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
