var validator = require("validator");
class LoginValidation {
  async checkRequest(request) {
    let errorResponse = {
      status: 200,
      message: null,
    };
    const emailErrors = [];
    const passwordErrors = [];

    Object.keys(request).forEach(function (key) {
      if (key === "email") {
        if (request.email.length === 0) {
          emailErrors.push("Email is required");
        } else {
          const checkEmail = validator.isEmail(request.email);
          if (!checkEmail) {
            emailErrors.push("Please enter a valid email address");
          }
        }
      }

      if (key === "password") {
        if (request.password.length === 0) {
          passwordErrors.push("Password is required");
        } else {
          if (request.password.length < 8) {
            passwordErrors.push(
              "Password should contain atleast of 8 characters"
            );
          }
        }
      }
    });

    if (emailErrors.length != 0 || passwordErrors.length != 0) {
      errorResponse = {
        status: 400,
        message: null,
        errors: {
          email: emailErrors,
          password: passwordErrors,
        },
      };
    }

    return errorResponse;
  }
}

module.exports = LoginValidation;
