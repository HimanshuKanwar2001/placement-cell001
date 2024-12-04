const mongoose = require("mongoose");

// Schema
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
    status: {
      type: String,
      enum: ["Placed", "Not Placed"],
      required: true,
    },
    dsa_score: {
      type: String,
      required: true,
    },
    webdev_score: {
      type: String,
      required: true,
    },
    react_score: {
      type: String,
      required: true,
    },
    interview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false, //Automatically adds createAt and updateAt fields
  }
);

const Student = mongoose.model("Student", studentSchema);

//Export the student model
module.exports = Student;
