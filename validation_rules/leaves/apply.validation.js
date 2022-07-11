class CreateValidation {
    async checkRequest(request) {
        let errorResponse = {
            status: 200,
            message: null,
        };

        const userIdErrors = [];
        let hasUserId = false;

        const typeIdErrors = [];
        let hasTypeId = false;

        const fromDateErrors = [];
        let hasFromDate = false;

        const toDateErrors = [];
        let hasToDate = false;

        const daysErrors = [];
        let hasDays = false;

        const reasonErrors = [];
        let hasReason = false;

        Object.keys(request).forEach(async function (key) {
            if (key === "userId") {
                if (request.userId.length === 0) {
                    userIdErrors.push("User Id is required");
                }
                hasUserId = true;
            }

            if (key === "typeId") {
                if (request.typeId.length === 0) {
                    typeIdErrors.push("User Id is required");
                }
                hasTypeId = true;
            }

            if (key === "fromDate") {
                if (request.fromDate.length === 0) {
                    fromDateErrors.push("User Id is required");
                }
                hasFromDate = true;
            }

            if (key === "toDate") {
                if (request.toDate.length === 0) {
                    toDateErrors.push("User Id is required");
                }
                hasToDate = true;
            }

            if (key === "days") {
                if (request.days.length === 0) {
                    daysErrors.push("User Id is required");
                }
                hasDays = true;
            }

            if (key === "reason") {
                if (request.reason.length === 0) {
                    reasonErrors.push("Reason is required");
                }
                hasReason = true;
            }
        });

        if (!hasUserId) {
            userIdErrors.push("User Id is required");
        }

        if (!hasTypeId) {
            typeIdErrors.push("Type Id is required");
        }

        if (!hasFromDate) {
            fromDateErrors.push("From Date is required");
        }

        if (!hasToDate) {
            toDateErrors.push("To Date is required");
        }

        if (!hasDays) {
            daysErrors.push("Days is required");
        }

        if (!hasReason) {
            reasonErrors.push("Reason is required");
        }

        if (userIdErrors.length != 0) {
            errorResponse = {
                status: 400,
                message: null,
                errors: {
                    userId: userIdErrors,
                    typeId: typeIdErrors,
                    fromDate: fromDateErrors,
                    toDate: toDateErrors,
                    days: daysErrors,
                    reason: reasonErrors,
                },
            };
        }

        return errorResponse;
    }

}

module.exports = CreateValidation;
