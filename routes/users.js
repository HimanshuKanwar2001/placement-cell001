const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");

// Profile route, accessible only if user is authenticated
router.get("/profile", passport.checkAuthentication, usersController.profile);

// Sign-up route
router.get("/sign-up", usersController.signUp);

// Sign-in route
router.get("/sign-in", usersController.signIn);

// Create user route
router.post("/create", usersController.create);

// Use passport for authentication during sign-in
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

// Sign-out route
router.get("/sign-out", usersController.destroySession);

module.exports = router;
