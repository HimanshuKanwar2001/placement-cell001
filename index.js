const express = require("express");
// const PORT = 8000;
const server = express();
require("dotenv").config();
const connectMongoDB = require("./db/mongodb.databse");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");
const passport = require("passport");
const passportLocal = require("./db/passport-local-satrategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoDB = require("./db/mongodb.databse");

// const sassMiddleware=require("node-sass-middleware");

// server.use(sassMiddleware({
//   src:"./assets/scss",
//   dest:"./assests/css",
//   debug:true,
//   outputStyle:"extended",
//   prefix:"/css"
// }))

connectMongoDB();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/css", express.static("./assets/css"));
server.use(expressEjsLayouts);
server.set("layout extractScripts", true);
server.set("layout extractStyle", true);

// view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

//mongo store is used to store the session cookie in the db
server.use(
  session({
    name: "placement_cell",
    // TODO: Change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Set the session expiration (in milliseconds)
    },
    store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/placement_cell_development", // MongoDB connection URI
      mongooseConnection: mongoDB.db, // Optional: Use the existing connection
      autoRemove: "disabled", // Disable automatic removal of sessions
    }),
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(passport.setAuthenticatedUser);
server.use("/", require("./routes"));
// console.log("PORT", process.env.PORT);
server.listen(process.env.PORT, (err, req, res, next) => {
  if (err) {
    console.log("Error Connecting to Server :", err);
  } else {
    console.log("Connected to Server", process.env.PORT);
  }
});
