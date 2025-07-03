const express=require('express');
const router=express.Router();
const passport = require("passport");
const studentController=require('../controllers/students_controller');


// Route to render the "Add Student" form
router.get(
  "/add-student",
  passport.checkAuthentication,
  studentController.addStudent
);

// Route to handle the creation of a new student
router.post('/create', studentController.create);

// Route to handle the deletion of a student based on the studentId
router.get("/destroy/:studentId", studentController.destroy);




module.exports=router;