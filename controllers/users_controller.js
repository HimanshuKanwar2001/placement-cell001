const User = require("../models/user");

// Controller to render the user profile page
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile Page",
  });
};

// Controller to render the Sign Up page
module.exports.signUp = function (req, res) {
  // Redirect to profile if already authenticated
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Placement Cell | Sign Up",
  });
};

// Controller to render the Sign In page
module.exports.signIn = function (req, res) {
  // Redirect to profile if already authenticated
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Placement Cell | Sign In",
  });
};

// Controller to handle user sign up
module.exports.create = async function (req, res) {
  // Check if password and confirm_password match
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    // Check if user with the given email already exists
    const user = await User.findOne({ email: req.body.email });

    console.log("Is User Present ", user);

    if (!user) {
      const { email, password, name } = req.body;
      // Create a new user and redirect to Sign In page
      const newUser = await User.create({ email, password, name });
      return res.redirect("/users/sign-in");
    } else {
      // Redirect back if user already exists
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to handle user sign in and create a session
module.exports.createSession = async function (req, res) {
  // Redirect to home page after successful sign-in
  return res.redirect("/");
};

// Controller to destroy the user session (logout)
module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
  });

  // Redirect to home page after logout
  return res.redirect("/");
};
