const express = require('express');
const { login, loginCheck, mypage, createUser } = require('../controllers/loginController');

const authentication = require('../middleware/authentication');
const router = express.Router();

router.get('/login', (req, res) => res.render('login.ejs'));

router.get('/mypage', authentication, mypage);

router.post('/login', login);
router.post('/createUser', createUser);

module.exports = router;
