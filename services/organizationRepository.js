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
}

module.exports = organizationRepository;
