const express = require('express');
const { isLoggedin } = require('../middleware/authentication');
const router = express.Router();

router.get('/login', (req, res) => res.render('login.ejs', { message: '' }));

router.get('/logout', isLoggedin, (req, res) => {
  console.log(req.user);
  req.logout(() => {
    req.session.destroy();
  });
  res.redirect('/dash');
});

router.get('/logout', isLoggedin);

module.exports = router;
