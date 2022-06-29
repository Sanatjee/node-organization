const userRepository = require("../services/userRepository");
const organizationRepository = require("../services/organizationRepository");

const catchAsyncError = require("../middlewares/catchAsyncError");

exports.getUsers = async (req, res) => {
  try {
    await res.status(200).json({
      users: userRepository.list,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = catchAsyncError(async (req, res) => {
  try {
    const { organizationId, firstName, lastName, contactNumber, email } =
      req.body;

    // Initializing Repositories
    const orgRepo = new organizationRepository();
    const userRepo = new userRepository();

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
