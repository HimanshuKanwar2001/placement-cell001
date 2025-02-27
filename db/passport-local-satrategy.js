const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user.model");

// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email });
        console.log("user is here :", user);
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          done(null, false);
        }
        console.log("User was found")
        done(null, user);
      } catch (err) {
        console.error("Error", err);
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.error("Error in finding user  --> Passport", err);
    done(err);
  }
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // If the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // If the user is not signed in, redirect to the sign-in page
  return res.redirect("/users/sign-in");
};

// Set authenticated user to locals for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie,
    // and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
