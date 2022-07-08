const catchAsyncError = require("../middlewares/catchAsyncError");

// Repository
const leaveType = require("../services/leaveTypesRepository");
const leaveTypeRepo = new leaveType();

// validation
const createValidation = require("../validation_rules/leaveTypes/create.validation");
const validateType = new createValidation();

exports.store = catchAsyncError(async (req, res) => {

    try {
        // validation starts
        // check if the request is done by super admin
        const canCreate = await leaveTypeRepo.isSuperAdmin(req.userInfo.id);

        if (!canCreate) {
            await res.status(400).json({
                status: 400,
                message: "Unauthorized Action",
                errors: null,
            });
            return;
        }

        const checkValidity = await validateType.checkRequest(req.body);

        if (checkValidity.status === 400) {
            await res.status(400).json(checkValidity);
            return;
        }


        const { title } = req.body;
        const leaveTypes = leaveTypeRepo.create({ title });

        return await res.status(400).json({
            status: 200,
            message: "Data Saved Successfully",
            leaveTypes: leaveTypes,
        });


    } catch (err) {
        console.log(err);
    }

})

exports.list = catchAsyncError(async (req, res) => {
    try {
        const leaves = await leaveTypeRepo.list();
        return await res.status(400).json({
            status: 200,
            message: "",
            leaves: leaves,
        })
    } catch (err) {
        console.log(err);
    }
})

exports.update = catchAsyncError(async (req, res) => {
    try {
        // validation starts
        // check if the request is done by super admin
        const canCreate = await leaveTypeRepo.isSuperAdmin(req.userInfo.id);

        if (!canCreate) {
            await res.status(400).json({
                status: 400,
                message: "Unauthorized Action",
                errors: null,
            });
            return;
        }

        const checkValidity = await validateType.checkRequest(req.body);

        if (checkValidity.status === 400) {
            await res.status(400).json(checkValidity);
            return;
        }


        const { id, title } = req.body;
        const leaveTypes = leaveTypeRepo.update(id, title);

        return await res.status(200).json({
            status: 200,
            message: "Data Updated Successfully",
            leaveTypes: leaveTypes,
        });


    } catch (err) {
        console.log(err);
    }
})

exports.delete = catchAsyncError(async (req, res) => {
    try {
        // validation starts
        // check if the request is done by super admin
        const canCreate = await leaveTypeRepo.isSuperAdmin(req.userInfo.id);

        if (!canCreate) {
            await res.status(400).json({
                status: 400,
                message: "Unauthorized Action",
                errors: null,
            });
            return;
        }

        const { id } = req.body;
        const leaveTypes = await leaveTypeRepo.delete(id);

        if (!leaveTypes) {
            await res.status(400).json({
                status: 400,
                message: "Leave Type not found",
                errors: null,
            });
            return;
        }

        return await res.status(200).json({
            status: 200,
            message: "Data deleted Successfully",
            leaveTypes: leaveTypes,
        });
    } catch (err) {
        console.log(err);
    }
})
