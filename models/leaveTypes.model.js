const mongoose = require("mongoose");

const leaveTypeModel = mongoose.Schema({
    title: {
        type: "string",
        required: true
    }
});

module.exports = mongoose.model("LeaveType", leaveTypeModel)