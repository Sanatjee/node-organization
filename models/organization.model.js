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
  totalLeavesAllowed: {
    type: Number,
  },
  monthlyLeavesAllowed: {
    type: Number,
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
  role: {
    type: String,
    default: "Organization",
  },
});

OrganizationModel.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Organization", OrganizationModel);
