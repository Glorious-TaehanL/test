const express = require('express');
const { login, createUser, mypage } = require('../controllers/loginController');
const { isLoggedin } = require('../middleware/authentication');

const router = express.Router();

router.get('/login', (req, res) => res.render('login.ejs', { message: '' }));
router.get('/mypage', isLoggedin, mypage);

router.post('/login', login);
router.post('/createUser', createUser);

module.exports = router;
