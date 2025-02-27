const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
