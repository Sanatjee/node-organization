// models
const leaveTypesModel = require("../models/leaveTypes.model");
const organizationModel = require("../models/organization.model");

class leaveTypesRepository {
    async create(request) {
        return await leaveTypesModel.create(request);
    }
    async list() {
        return await leaveTypesModel.find({});
    }
    async update(id, title) {
        return await leaveTypesModel.findOneAndUpdate({ "_id": id }, { title: title }, { new: true });
    }

    async delete(id) {
        const checkIfExist = await leaveTypesModel.findById(id);

        if (!checkIfExist) {
            return false;
        }
        return await leaveTypesModel.findOneAndDelete({ "_id": id });
    }

    async ifExists(title) {
        return await leaveTypesModel.findOne({ title });
    }

    async isSuperAdmin(id) {

        const userInfo = await organizationModel.findById(id);

        if (userInfo && userInfo.role == "ADMIN") {
            return true;
        }
        return false;
    }
}

module.exports = leaveTypesRepository;