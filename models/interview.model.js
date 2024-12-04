const mongoose = require("mongoose");

// Schema
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
    studentname: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    company_name: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: String,
      reuqired: true,
    },
    status: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt", "To Be Decided"],
      default: "To Be Decided",
      required: true,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
