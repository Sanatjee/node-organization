const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  organizationId: {
    type: String,
    required: true,
  },
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
    unique: true,
  },
  password: {
    type: String,
    length: 8,
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
    required: true,
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

User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("User", User);
