const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

class userRepository {
  constructor() { }

  async list(orgId) {
    const users = await userModel.find({ organizationId: orgId });
    return users;
  }

  async store(req) {
    console.log(req);
    const password = await this.createPassword(req.contactNumber);
    req.password = password;
    const newUser = await userModel.create(req);

    return newUser;
  }

  async update() { }

  async destroy() { }

  async createPassword(contactNumber) {
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt
      .hash(contactNumber.toString(), salt)
      .catch((error) => {
        console.log(error);
      });
    return password;
  }

  async createToken(email, password) {
    let user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password.toString(), user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.tokenKey,
        {
          expiresIn: "30d",
        }
      );

      return {
        status: 200,
        message: "Welcome! How are you doing today?",
        userInfo: user,
        token: token,
      };
    }
    return {
      status: 400,
      message: "Invalid Credentials",
      errors: null,
    };
  }

  async canAddUsers(orgId) {

    const orgUsers = await userModel.find({ organizationId: orgId });
    console.log(orgUsers);
    console.log("Length is " + orgUsers.length);
    if (orgUsers.length >= 5) {
      return false;
    }
    return true;
  }

  async findUserByEmail(email) {

    return await userModel.findOne({ email });

  }

  // async canEdit(orgId, userId) {
  //   const userInfo = await userModel.find({ _id: userId });
  //   console.log(userInfo);
  // }
}

module.exports = userRepository;
