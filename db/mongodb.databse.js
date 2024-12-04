const mongoose = require("mongoose");
// const { db } = require("../models/user.model");
require("dotenv").config();

const connectMongoDB = async () => {
  try {
    // Connect to the MongoDB database
    // console.log("MONGO_URI", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }

  // Set up event listeners
  module.exports.db = mongoose.connection;
  // db.on("error", console.error.bind(console, "MongoDB connection error:"));
  // db.once("open", () => {
  //   console.log("MongoDB connection is open");
  // });
};

module.exports = connectMongoDB;
