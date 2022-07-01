const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users.controller");

// CRUD for users
router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getSingleUsers);
router.post("/users/create", usersController.createUser);
router.put("/users/update/:id", usersController.updateUser);
router.delete("/users/delete/:id", usersController.deleteUser);

// Login users
router.post("/user/login", usersController.login);

module.exports = router;