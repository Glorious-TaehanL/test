const express = require('express');
const { configData } = require('../controllers/settingsController');
const router = express.Router();

router.get('/', configData);
module.exports = router;
