const express = require('express');
const router = express.Router();

// controller
const usersController = require("../controllers/users.controller");

// middleware
const nullRequest = require('../middlewares/nullRequest');
const auth = require('../middlewares/auth');

// CRUD for users
router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getSingleUsers);
router.post("/users/create", [nullRequest, auth], usersController.createUser);
router.put("/users/update/:id", usersController.updateUser);
router.delete("/users/delete/:id", usersController.deleteUser);

// Login users
router.post("/user/login", [nullRequest], usersController.login);

module.exports = router;