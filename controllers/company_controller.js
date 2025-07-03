const Student = require("../models/student");
const Interview = require("../models/interview");
const Company = require("../models/company");

// Controller to render the company page with student results
module.exports.companyPage = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Fetch student, interview, and company data
      const student = await Student.find({});
      const interview = await Interview.find({});
      const company = await Company.find({});

      // Render the company page with student results
      return res.render("company", {
        title: "Add Company",
        all_company: company,
      });
    }

    // Redirect to sign-in page if not authenticated
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to create a new company
module.exports.create = async function (req, res) {
  try {
    // Check if the company with the given name already exists
    const company = await Company.findOne({ name: req.body.name });

    if (!company) {
      // If the company doesn't exist, create a new one
      await Company.create({
        name: req.body.name,
        date: req.body.date,
      });
    }
    return res.redirect("back");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to delete a company and associated interviews
module.exports.delete = async function (req, res) {
  try {
    const cpyId = req.params.companyId;
    const company = await Company.findById(cpyId);
    let companyID = company._id;

    // Delete the company and associated interviews
    await company.deleteOne();
    await Interview.deleteMany({ companyId: companyID });

    return res.redirect("back");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
