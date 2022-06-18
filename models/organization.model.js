const mongoose = require("mongoose");

const OrganizationModel = mongoose.Schema({
  organizationType: {
    type: String,
    enum: ["LLP", "PVT_LTD"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Organization", OrganizationModel);
