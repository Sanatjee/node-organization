const bcrypt = require("bcrypt");
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
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.tokenKey,
        {
          expiresIn: "30d",
        }
      );

      // save user token
      user.token = token;
      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  }

  async canAddUsers(orgId) {
    console.log(orgId);
    const orgUsers = await userModel.find({ organizationId: orgId });
    if (orgUsers.length > 5) {
      return false;
    }
    return true;
  }


}



module.exports = userRepository;
