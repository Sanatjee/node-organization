const leaveTypesRepository = require("../../services/leaveTypesRepository");

const leaveTypeRepo = new leaveTypesRepository();

class CreateValidation {
    async checkRequest(request) {
        let errorResponse = {
            status: 200,
            message: null,
        };

        const titleErrors = [];

        let hastitle = false;

        const checkType = await leaveTypeRepo.ifExists(request.title);

        Object.keys(request).forEach(async function (key) {
            if (key === "title") {

                if (request.title.length === 0) {
                    titleErrors.push("Title is required");
                } else {

                    if (checkType) {
                        titleErrors.push("Leave Type already exists!");
                    }

                }
                hastitle = true;
            }
        });

        if (!hastitle) {
            titleErrors.push("Title is required");
        }

        if (titleErrors.length != 0) {
            errorResponse = {
                status: 400,
                message: null,
                errors: {
                    title: titleErrors
                },
            };
        }

        return errorResponse;
    }

}

module.exports = CreateValidation;
