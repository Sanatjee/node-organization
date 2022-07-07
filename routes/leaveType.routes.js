const express = require("express");
const router = express.Router();
const leaveTpeController = require('../controllers/leaveTypes.controller');

router.get('/leave-type/list', leaveTpeController.list);
router.post('/leave-type/store', leaveTpeController.store);
router.get('/leave-type/detail/:id', leaveTpeController.list);
router.put('/leave-type/update', leaveTpeController.update);
router.delete('/leave-type/delete', leaveTpeController.delete);

module.exports = router;