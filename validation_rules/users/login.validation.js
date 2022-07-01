class LoginValidation {
    async checkRequest(email, password) {
        const emailErrors = [];
        const passwordErrors = [];

        let errorResponse = {
            status: 200
        }
        if (!email) {
            emailErrors.push("Email is required");
        }

        if (!password) {
            passwordErrors.push("Password is required");
        }

        if (emailErrors.length != 0 || passwordErrors.length != 0) {
            errorResponse = {
                status: 400,
                errors: {
                    email: emailErrors.length > 0 ? emailErrors : null,
                    password: passwordErrors.length > 0 ? passwordErrors : null,
                }
            }
        }

        return errorResponse;
    }
}

module.exports = LoginValidation;
