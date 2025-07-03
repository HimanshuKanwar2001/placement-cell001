const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Get the default connection
const db = mongoose.connection;

// Event listener for MongoDB connection error
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// Event listener for successful MongoDB connection
db.once("open", function () {
  console.log("Connected to the Database::MongoDB");
});

// Export the database connection
module.exports = db;
