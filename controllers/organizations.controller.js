const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const organization = require("../models/organization.model");

const catchAsyncError = require("../middlewares/catchAsyncError");

// Repository Imports
const organizationRepository = require("../services/organizationRepository");

// Validation Imports
const LoginValidation = require("../validation_rules/users/login.validation");

// Initialization of Validation
const validateUser = new LoginValidation();

// Initialize Repo
const orgRepo = new organizationRepository();

exports.createOrganization = catchAsyncError(async (req, res) => {
  try {
    const { organizationType, name, email, contactNumber, isPaid } = req.body;

    // Password generation starts here
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt
      .hash(contactNumber.toString(), salt)
      .catch((error) => {
        console.log(error);
      });

    // Password generation ends here

    const newOrganization = await organization.create({
      organizationType,
      name,
      email,
      password,
      contactNumber,
      isPaid,
    });

    // Token generation starts here
    const token = jwt.sign(
      {
        id: newOrganization._id, email: newOrganization.email
      },
      process.env.tokenKey,
      {
        expiresIn: "30d",
      });
    // Token generation ends here

    res.status(201).json({
      message: "Organization created successfully",
      organization: newOrganization,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something Went Wrong.Try again later!", error });
  }
});

exports.listOrganizations = async (req, res) => {
  try {
    const organizationsList = await organization.find();
    if (!organizationsList) {
      res.status(400).json({
        message: "No organizations found",
        organizations: organizationsList,
      });
    }
    res.status(200).json({ organizations: organizationsList });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.Try again later!", error });
  }
};

exports.getSingleOrganization = async (req, res) => {
  try {
    const organizationDetail = await organization.findById(req.params.id);

    if (!organizationDetail) {
      res.status(400).json({
        message: "Organization not found",
        organizations: organizationDetail,
      });
    }
    res.status(200).json({
      organization: organizationDetail,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.Try again later!", error });
  }
};

exports.updateOrganizations = async (req, res) => {
  try {
    const organizationDetail = await organization.findById(req.params.id);

    const organizationId = req.params.id;
    if (!organizationDetail) {
      res.status(400).json({
        message: "Organization not found",
        organizations: organizationDetail,
      });
    }

    const { organizationType, name, contactNumber, isPaid } = req.body;
    const updateOrganization = await organization.findByIdAndUpdate(
      organizationId,
      {
        organizationType,
        name,
        contactNumber,
        isPaid,
      },
      {
        new: true,
      }
    );
    if (!updateOrganization) {
      res
        .status(400)
        .json({ message: "Something Went Wrong.Try again later!" });
    }
    res.status(201).json({
      message: "Organization updated successfully",
      updateOrganization,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.Try again later!", error });
  }
};

exports.deleteOrganizations = catchAsyncError(async (req, res) => {
  try {
    const organizationDetail = await organization.findById(req.params.id);

    const organizationId = req.params.id;
    if (!organizationDetail) {
      res.status(400).json({
        message: "Organization not found",
        organizations: organizationDetail,
      });
    }
    const deleteOrganization = await organization.findByIdAndDelete(
      req.params.id
    );

    if (!deleteOrganization) {
      res
        .status(400)
        .json({ message: "Something Went Wrong.Try again later!" });
    }

    res.status(200).json({
      message: "Organization deleted successfully",
      deleteOrganization,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.Try again later!", error });
  }
});

exports.login = catchAsyncError(async (req, res) => {
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
  const orgInfo = await orgRepo.login(email, password);

  if (orgInfo.status === 400) {
    await res.status(400).json(orgInfo);
    return;
  }

  await res.status(200).json(orgInfo);
});