const mongoose = require("mongoose");

const OrganizationModel = mongoose.Schema({
  organizationType: {
    type: String,
    enum: ["LLP", "PVT LTD"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Organization", OrganizationModel);
