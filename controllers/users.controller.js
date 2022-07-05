const userRepository = require("../services/userRepository");
const organizationRepository = require("../services/organizationRepository");

const LoginValidation = require("../validation_rules/users/login.validation");

const catchAsyncError = require("../middlewares/catchAsyncError");

// Initializing Repositories
const orgRepo = new organizationRepository();
const userRepo = new userRepository();

// Initialization of Validation
const validateUser = new LoginValidation();

exports.getUsers = async (req, res) => {
  try {
    const { organizationId } = req.body;
    return res.status(200).json({
      users: await userRepo.list(organizationId),
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = catchAsyncError(async (req, res) => {
  try {
    const { organizationId, firstName, lastName, contactNumber, email } =
      req.body;

    // check for organization id and validate organization
    const checkOrg = await orgRepo.orgExists(organizationId);

    if (!checkOrg.isValid) {
      return res.status(400).json({
        message: "organization not found!",
      });
    }

    // check if organization can add a user
    if (!checkOrg.isPaid) {
      const checkIfPaid = await userRepo.canAddUsers(organizationId);
      if (!checkIfPaid) {
        return res.status(400).json({
          message: "Please upgrade your plan to add team mates!",
        });
      }
    }

    // create a user
    const newUser = await userRepo.store({
      organizationId,
      firstName,
      lastName,
      contactNumber,
      email,
    });

    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
});

exports.getSingleUsers = async (res, req) => {
  res.status(200).json({
    users: userRepository.list,
  });
};

exports.updateUser = async (res, req) => {};

exports.deleteUser = async (res, req) => {};

// Post login

exports.login = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    await res.status(400).json({
      status: 400,
      message: "Invalid request.",
      errors: null,
    });
  }

  // Validation starts
  const checkValidity = await validateUser.checkRequest(req.body);

  if (checkValidity.status === 400) {
    await res.status(400).json(checkValidity);
    return;
  }

  // send data to repo
  const { email, password } = req.body;
  const userInfo = await userRepo.createToken(email, password);

  if (userInfo.status === 400) {
    await res.status(400).json(userInfo);
    return;
  }

  await res.status(200).json(userInfo);
};

exports.requestNewPassword = async (res, req) => {};

exports.updatePassword = async (res, req) => {};
