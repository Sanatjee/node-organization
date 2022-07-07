const userRepository = require("../services/userRepository");
const organizationRepository = require("../services/organizationRepository");

const LoginValidation = require("../validation_rules/users/login.validation");
const createValidation = require("../validation_rules/users/create.validation")

const catchAsyncError = require("../middlewares/catchAsyncError");

// Initializing Repositories
const orgRepo = new organizationRepository();
const userRepo = new userRepository();

// Initialization of Validation
const validateUser = new LoginValidation();
const validateCreateUser = new createValidation();

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

    // Validation starts
    const checkValidity = await validateCreateUser.checkRequest(req.body);

    if (checkValidity.status === 400) {
      await res.status(400).json(checkValidity);
      return;
    }

    const { firstName, lastName, contactNumber, email } =
      req.body;

    // check for organization id and validate organization
    // here userInfo is the organization id
    const organizationId = req.userInfo.id;
    const checkOrg = await orgRepo.orgExists(organizationId);

    if (!checkOrg.isValid) {
      return res.status(400).json({
        status: 400,
        message: "organization not found!",
        errors: null,
      });
    }

    // check if organization can add a user
    if (!checkOrg.isPaid) {
      const checkIfPaid = await userRepo.canAddUsers(organizationId);
      console.log(checkIfPaid);
      if (!checkIfPaid) {
        return res.status(400).json({
          status: 400,
          message: "Please upgrade your plan to add team mates!",
          errors: null,
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

exports.updateUser = async (res, req) => { };

exports.deleteUser = async (res, req) => { };

// Post login

exports.login = async (req, res) => {

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

exports.requestNewPassword = async (res, req) => { };

exports.updatePassword = async (res, req) => { };
