const express = require("express");
const router = express.Router();

// middlewares
const auth = require("../middlewares/auth");
const nullRequest = require("../middlewares/nullRequest")

const leaveTpeController = require('../controllers/leaveTypes.controller');

router.get('/leave-type/list', leaveTpeController.list);
router.post('/leave-type/create', [nullRequest, auth], leaveTpeController.store);
router.get('/leave-type/detail/:id', leaveTpeController.list);
router.put('/leave-type/update', [nullRequest, auth], leaveTpeController.update);
router.delete('/leave-type/delete', [nullRequest, auth], leaveTpeController.delete);

module.exports = router;