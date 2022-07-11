const mongoose = require("mongoose");

const leavesModel = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    typeId: {
        type: String,
        required: true
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    },
});

leavesModel.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("LeaveType", leavesModel) 