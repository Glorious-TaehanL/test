const express = require('express');
const { login, createUser } = require('../controllers/loginController');
const router = express.Router();

router.get('/login', (req, res) => res.render('login.ejs'));

router.post('/login', login);
router.post('/createUser', createUser);

module.exports = router;
