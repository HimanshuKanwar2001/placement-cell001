const Student = require("../models/student");
const Interview = require("../models/interview");

// Controller to render the home page with students data
module.exports.home = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Fetch all students and populate their interview details
      const students = await Student.find({});
      const allStudents = await Student.find({}).populate("interviews");
      console.log(allStudents);

      // Render the home page with students data
      return res.render("home", {
        title: "Students Data",
        allStudents: allStudents,
      });
    }

    // Redirect to sign-in page if not authenticated
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
