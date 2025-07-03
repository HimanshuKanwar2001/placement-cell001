const mongoose = require("mongoose");

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Not Placed"],
      required: true,
    },
    dsa_score: {
      type: Number,
      required: true,
    },
    webdev_score: {
      type: Number,
      required: true,
    },
    react_score: {
      type: Number,
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

// Create the Student model based on the studentSchema
const Student = mongoose.model("Student", studentSchema);

// Export the Student model
module.exports = Student;
