const express = require("express")
const router = express.Router();

// middleware
const nullRequest = require("../middlewares/nullRequest")
const auth = require("../middlewares/auth");

const leavesController = require("../controllers/leaves.controller");


router.post('/leaves/apply', [nullRequest, auth], leavesController.applyForLeave);

module.exports = router; 