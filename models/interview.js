const mongoose = require("mongoose");

// Define the interview schema
const interviewSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    studentBatch: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    companyName: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt", "To Be Decided"],
      default: "To Be Decided",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Interview model based on the interviewSchema
const Interview = mongoose.model("Interview", interviewSchema);

// Export the Interview model
module.exports = Interview;
