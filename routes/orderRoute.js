const express = require('express');
const { displayOrderList } = require('../controllers/orderController');

const router = express.Router();

router.get('/', displayOrderList);

module.exports = router;
