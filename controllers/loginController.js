const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const StatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_KEY;

const login = async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.render(`login.ejs`, { message: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.render('index.ejs', { user: req.user });
    });
  })(req, res, next);
};

const createUser = (req, res) => {
  const { userId, userPw, name } = req.body;
  User.create({ userId: userId, userPw: userPw, name: name })
    .then(function () {
      res.json({ message: 'Successfully create user' });
    })
    .catch(function () {});
};

const mypage = (req, res) => {
  if (req.user) {
    console.log(req.user);
  }
  res.render('mypage.ejs', { user: req.user });
};

module.exports = {
  login,
  createUser,
  mypage,
};
