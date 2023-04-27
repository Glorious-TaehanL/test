const express = require('express');
const { login, createUser, mypage } = require('../controllers/loginController');
const { isLoggedin } = require('../middleware/authentication');

const router = express.Router();

router.get('/mypage', isLoggedin, mypage);
router.get('/login', login);
router.post('/login', login);
router.post('/createUser', createUser);

module.exports = router;
