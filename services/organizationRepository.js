const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const organization = require("../models/organization.model");

class organizationRepository {
  async orgExists(orgId) {
    const checkOrg = await organization.findById(orgId);
    const responseObj = {
      isValid: false,
      isPaid: false,
    };
    if (!checkOrg) {
      return responseObj;
    }

    if (checkOrg.isPaid) {
      return {
        isValid: true,
        isPaid: true,
      };
    } else {
      return {
        isValid: true,
        isPaid: false,
      };
    }
  }

  async login(email, password) {
    let orgInfo = await organization.findOne({ email });

    if (orgInfo && (await bcrypt.compare(password.toString(), orgInfo.password))) {
      // Create token
      const token = jwt.sign(
        { organization_id: orgInfo._id, email },
        process.env.tokenKey,
        {
          expiresIn: "30d",
        }
      );

      return {
        status: 200,
        message: "Welcome! How are you doing today?",
        organizationInfo: orgInfo,
        token: token,
      };
    }
    return {
      status: 400,
      message: "Invalid Credentials",
      errors: null,
    };
  }
  
}

module.exports = organizationRepository;
