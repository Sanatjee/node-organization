const catchAsyncError = require("../middlewares/catchAsyncError");

// validation
const createValidation = require("../validation_rules/leaves/apply.validation");
const validateType = new createValidation();

exports.applyForLeave = catchAsyncError(async (req, res) => {
    try {
        const checkValidity = await validateType.checkRequest(req.body);

        if (checkValidity.status === 400) {
            await res.status(400).json(checkValidity);
            return;
        }


    } catch (err) {
        console.log(err);
    }
});