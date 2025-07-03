const express = require("express");
const router = express.Router();
const passport = require("passport");
const interviewController = require("../controllers/interviews_controller");


// Route to render the "Add Interview" form
router.get(
  "/add-interview",
  passport.checkAuthentication,
  interviewController.addInterview
);

// Route to handle the creation of a new interview
router.post("/create", interviewController.create);

// Route to handle the deletion of an interview based on the interviewId
router.get("/destroy/:interviewId", interviewController.destroy);

// Route to handle the update of an interview based on the interviewId
router.post("/update/:interviewId", interviewController.update);

// Route to export user data using the exportUser function from the interviews_controller
router.get("/exportUser", interviewController.exportUser);

module.exports = router;
