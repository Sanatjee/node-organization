const validator = require("validator");

const userRepository = require("../../services/userRepository");

const userRepo = new userRepository();



class LoginValidation {
    async checkRequest(request) {
        let errorResponse = {
            status: 200,
            message: null,
        };

        const firstNameErrors = [];
        const lastNameErrors = [];
        const contactNumberErrors = [];
        const emailErrors = [];

        let hasFirstName = false;
        let hasLastName = false;
        let hascontactNumber = false;
        let hasEmail = false;

        const checkUser = await userRepo.findUserByEmail(request.email);

        Object.keys(request).forEach(async function (key) {
            if (key === "email") {

                console.log(request.email.length)
                if (request.email.length === 0) {
                    emailErrors.push("Email is required");
                } else {
                    const checkEmail = validator.isEmail(request.email);
                    if (!checkEmail) {
                        emailErrors.push("Please enter a valid email address");
                    }

                    // const checkForUniqueUser = userRepo.findUserByEmail(request.email);

                    if (checkUser) {
                        emailErrors.push("User already exists!");
                    }

                }
                hasEmail = true;
            }


            if (key === "firstName") {
                if (request.firstName.length === 0) {
                    firstNameErrors.push("First Name is required");
                }
                hasFirstName = true;
            }

            if (key === "lastName") {
                if (request.lastName.length === 0) {
                    lastNameErrors.push("First Name is required");
                }
                hasLastName = true;
            }

            if (key === "contactNumber") {
                if (request.contactNumber.length === 0) {
                    contactNumberErrors.push("Contact Number is required");
                }

                if (request.contactNumber.length > 10) {
                    contactNumberErrors.push("Contact Number should be a 10 digit number");
                }
                hascontactNumber = true;
            }
        });

        if (!hasFirstName) {
            firstNameErrors.push("First Name is required");
        }

        if (!hasLastName) {
            lastNameErrors.push("Last Name is required");
        }

        if (!hascontactNumber) {
            contactNumberErrors.push("Contact Number is required");
        }

        if (!hasEmail) {
            emailErrors.push("Email is required");
        }

        if (emailErrors.length != 0 || firstNameErrors.length != 0 || lastNameErrors.length != 0 || contactNumberErrors.length != 0) {
            errorResponse = {
                status: 400,
                message: null,
                errors: {
                    email: emailErrors,
                    firstName: firstNameErrors,
                    lastName: lastNameErrors,
                    contactNumber: contactNumberErrors,
                },
            };
        }

        return errorResponse;
    }

}

module.exports = LoginValidation;
