const mongoose = require("mongoose");

const OrganizationLeaveTypes = mongoose.Schema({
    organizationId: {
        type: "string",
        required: true
    },
    leaveTypeId: {
        type: "string",
        required: true
    },
});

module.exports = mongoose.model("OrganizationLeaveTypes", OrganizationLeaveTypes)