const express = require('express');
const router = express.Router(); // access the method of route
const userController = require('./user.controller');

// add user
router.post('/new', userController.userInsert);

module.exports = router;