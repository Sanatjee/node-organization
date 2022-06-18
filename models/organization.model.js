const mongoose = require("mongoose");

const OrganizationModel = mongoose.Schema({
  _id: mongoose.ObjectId,
  organizationType: {
    type: String,
    enum: ["LLP", "PVT_LTD"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Organization", OrganizationModel);
