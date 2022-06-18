const mongoose = require("mongoose");

const EmployeeModel = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    length: 8,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  dateOfBirth: {
    type: Date,
  },
  contactNumber: {
    type: String,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  ctc: {
    type: Number,
  },
  designation: {
    type: String,
  },
  joiningDate: {
    type: Date,
    default: new Date(),
  },
  lastDate: {
    type: Date,
  },
  role: {
    type: String,
    default: "Employee",
  },
  Permissions: {
    type: String,
    default: "read",
  },
});

module.exports = mongoose.module("EmployeeModel", EmployeeModel);
