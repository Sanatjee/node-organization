const userRepository = require("../services/userRepository");
const organizationRepository = require("../services/organizationRepository");

exports.getUsers = async (req, res) => {
    try {
        await res.status(200).json({
            users: userRepository.list
        });
    } catch (err) {
        console.error(err);
    }

}

exports.createUser = async (req, res) => {
    try {
        const { organizationId, firstName, lastName, contactNumber, email } = req.body;
        // check for organization id and validate organization
        // check if organization can add a user

        // create a user
        const repo = new userRepository();
        const newUser = await repo.store({ organizationId, firstName, lastName, contactNumber, email });

        res.status(200).json({
            user: newUser
        })

    } catch (err) {
        res.status(400).json({
            err
        })
    }

}

exports.getSingleUsers = async (res, req) => {
    res.status(200).json({
        users: userRepository.list
    });
}

exports.updateUser = async (res, req) => {

}

exports.deleteUser = async (res, req) => {

}