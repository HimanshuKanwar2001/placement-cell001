const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("./config/mongoose"); // Ensure this exports the Mongoose connection or URL
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
// const sassMiddleware = require("node-sass-middleware");
const CsvParser = require("json2csv");
require("dotenv").config();
const port = process.env.PORT || 8000;

// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, 'assets/scss'),
//     dest: path.join(__dirname, 'assets/css'),
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css',
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

// Extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Mongo store to store the session cookie in the database
app.use(
  session({
    name: "placement_cell",
    secret: "yourSessionSecretHere", // Use a secure, unique secret or environment variable in production
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use express router
app.use("/", require("./routes"));

// Start the server
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server ", err);
  }
  console.log("Server is running on port ", port);
});
