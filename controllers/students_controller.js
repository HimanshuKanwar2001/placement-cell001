const Student = require("../models/student");
const Interview = require("../models/interview");
const Result = require("../models/company");

// Controller to render the add student page
module.exports.addStudent = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      return res.render("add_student", {
        title: "Add Student",
      });
    }

    // Redirect to sign-in page if not authenticated
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to create a new student
module.exports.create = async function (req, res) {
  try {
    // Check if a student with the given email already exists
    // const student = await Student.findOne({ email: req.body.email });
    // console.log("create Student", student);

    // if (!student) {
      // Create a new student if not found
      await Student.create({
        email: req.body.email,
        batch: req.body.batch,
        name: req.body.name,
        college: req.body.college,
        status: req.body.status,
        dsa_score: req.body.dsa_score,
        webdev_score: req.body.webdev_score,
        react_score: req.body.react_score,
      });
    // }

    // Redirect back
    return res.redirect("back");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to delete a student and associated interviews
module.exports.destroy = async function (req, res) {
  // Find the student by ID
  const student = await Student.findById(req.params.studentId);

  // Delete the student
  await student.deleteOne();

  // Delete all interviews associated with the student
  await Interview.deleteMany({ studentId: req.params.studentId });

  // Redirect back
  return res.redirect("back");
};
