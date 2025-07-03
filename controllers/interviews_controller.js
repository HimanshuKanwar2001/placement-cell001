const Interview = require("../models/interview");
const Student = require("../models/student");
const Company = require("../models/company");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const path = require("path");

// Controller to render the addInterview page
module.exports.addInterview = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Fetch all interviews, students, and companies
      const interviews = await Interview.find({});
      const students = await Student.find({});
      const company = await Company.find({});

      // Render the add_interview page with data
      return res.render("add_interview", {
        title: "Interview Details",
        allInterview: interviews,
        allStudent: students,
        allCompany: company,
      });
    }

    // Redirect to sign-in page if not authenticated
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to create a new interview
module.exports.create = async function (req, res) {
  try {
    // Extract relevant data from form input
    const [studentId, studentBatch, studentName] =
      req.body.studentName.split(",");
    const [companyId, companyName, companyDate] =
      req.body.companyName.split(",");

    // Create a new interview
    const interview = await Interview.create({
      studentId: studentId,
      studentBatch: studentBatch,
      studentName: studentName,
      companyId: companyId,
      companyName: companyName,
      interviewDate: companyDate,
    });

    // Update Student's Interviews Array
    const student = await Student.findById(studentId);
    if (!student) {
      console.error("Student not found");
      return res.status(404).send("Student not found");
    }
    student.interviews.push(interview);
    await student.save();

    // Update Companies Interviews Array
    const company = await Company.findById(companyId);
    if (!company) {
      console.error("Company not found");
      return res.status(404).send("Company not found");
    }
    company.interviews.push(interview);
    await company.save();

    // Redirect back
    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to delete an interview and update related records
module.exports.destroy = async function (req, res) {
  try {
    // Find the interview by ID
    let interviewId = req.params.interviewId;
    const interview = await Interview.findById(interviewId);
    let studentId = interview.studentId;
    let companyId = interview.companyId;

    // Delete the interview
    await interview.deleteOne();

    // Remove the interview from Student's Interviews Array
    const student = await Student.findByIdAndUpdate(studentId, {
      $pull: { interviews: interviewId },
    });

    // Remove the interview from Company's Interviews Array
    const company = await Company.findByIdAndUpdate(companyId, {
      $pull: { interviews: interviewId },
    });

    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to update the status of an interview
module.exports.update = async function (req, res) {
  try {
    // Extract interview ID and status from the form
    const interviewId = req.params.interviewId;
    const status = req.body.status;

    // Update the interview status
    const interview = await Interview.findByIdAndUpdate(interviewId, {
      $set: { status: status ,},
    });

    // Redirect back
    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to export user data as CSV
module.exports.exportUser = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Fetch all interviews with associated student details
      const interviews = await Interview.find({}).populate("studentId");

      // Map interview data to CSV format
      let users = interviews.map((data) => {
        return {
          Student_Id: data.studentId._id,
          Student_Name: data.studentId.name,
          Student_College: data.studentId.college,
          Student_Status: data.studentId.status,
          DSA_Final_Score: data.studentId.dsa_score,
          WebDev_Final_Score: data.studentId.webdev_score,
          React_Score: data.studentId.react_score,
          Interview_Date: data.interviewDate,
          Interview_Company: data.companyName,
          Interview_Result: data.status,
        };
      });

      // Convert data to CSV format
      const csv = json2csv(users);

      // Define file path for CSV file
      const filePath = path.join(__dirname, "Student_Info.csv");

      // Write CSV data to file
      fs.writeFileSync(filePath, csv);

      // Send the CSV file as a download
      return res.download(filePath, "Student_Info.csv", (err) => {
        if (err) {
          console.error("Error while sending file:", err);
          return res.status(500).send("Internal Server Error");
        }
        // Delete the file after it has been sent
        fs.unlinkSync(filePath);
      });
    }

    // Redirect to sign-in page if not authenticated
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};
