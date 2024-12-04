const express = require("express");
const router = express.Router();

// Importing modular routes
const studentRoutes = require("./student.details.routes");
const companyRoutes = require("./add.company.routes");
const interviewRoutes = require("./interview.routes");
const dashboardRoutes = require("./dashboard.routes");
const homeController = require("../controllers/dashboard.controller");
const passport = require("passport");

// Route to render the home page
router.get("/", passport.checkAuthentication, homeController.home);

// Modular Routes
router.use("/interview", interviewRoutes); // Routes for interview
router.use("/company", companyRoutes); // Routes for adding companies
router.use("/student", studentRoutes); // Routes for student details
router.use("/users", dashboardRoutes); // Routes for dashboard

// Fallback Route for Unknown Endpoints
router.use((req, res, next) => {
  // res.status(404).json({ error: "Route not found" });
  next();
});

module.exports = router;
