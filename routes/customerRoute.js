const express = require('express');
const { getCustomerList } = require('../controllers/customerController');
const router = express.Router();

router.get('/', getCustomerList);

module.exports = router;
