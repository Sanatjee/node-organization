const bcrypt = require('bcrypt');
const user = require('../models/users.model');

class userRepository {


    constructor() { }

    async list() {
        const users = await this.user.find();
        return users;
    }

    async store(req) {
        console.log(req);
        const password = await this.createPassword(req.contactNumber);
        req.password = password;
        const newUser = await user.create(req)

        return newUser;
    }

    async update() {

    }

    async destroy() {

    }

    async createPassword(contactNumber) {
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt
            .hash(contactNumber.toString(), salt)
            .catch((error) => {
                console.log(error);
            });
        return password;
    }

    async createToken() {
        
    }

}

module.exports = userRepository;