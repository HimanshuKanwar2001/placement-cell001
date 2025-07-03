const mongoose = require("mongoose");

// Define the company schema
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Company model based on the companySchema
const Company = mongoose.model("Company", companySchema);

// Export the Company model
module.exports = Company;
