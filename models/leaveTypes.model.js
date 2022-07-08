const mongoose = require("mongoose");

const leaveTypeModel = mongoose.Schema({
    title: {
        type: "string",
        required: true
    }
});

leaveTypeModel.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("LeaveType", leaveTypeModel)