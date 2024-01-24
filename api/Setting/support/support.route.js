const express = require('express');
const router = express.Router();
const supportController = require('./support.controller');

// add support
router.post('/', supportController.insertSupport);

// all supports
router.get('/', supportController.ListSupports);

module.exports = router;