const express = require("express");
const router = express.Router();
const passport = require("passport");
const homeController = require("../controllers/home_controller");


// Route to render the home page
router.get("/", passport.checkAuthentication, homeController.home);

// Users routes
router.use("/users", require("./users"));

// Student routes
router.use("/student", require("./student"));

// Interview routes
router.use("/interview", require("./interview"));

// Company routes
router.use("/company", require("./company"));

module.exports = router;
