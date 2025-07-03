const express = require("express");
const router = express.Router();
const passport = require("passport");
const companyController = require("../controllers/company_controller");


// Route to render the add company page
router.get(
  "/add-company",
  passport.checkAuthentication,
  companyController.companyPage
);

// Route to handle the creation of a new company
router.post("/create", companyController.create);

// Route to handle the deletion of a company by companyId
router.get("/destroy/:companyId", companyController.delete);

module.exports = router;
