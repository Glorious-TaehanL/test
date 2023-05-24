const express = require('express');
const { displayReportData } = require('../controllers/reportController');
const { login } = require('../controllers/loginController');
const router = express.Router();

router.get('/', displayReportData);
router.post('/', login);

module.exports = router;
