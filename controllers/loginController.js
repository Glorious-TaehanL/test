const User = require('../models/User');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const StatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_KEY;

const login = async (req, res) => {
  const { userId, userPw } = req.body;

  if (!userId || !userPw) {
    console.log('Please provide Id and Password');
  }

  const user = await User.findOne({ userId: userId });
  if (!user) {
    console.log('Please provide correct Id or Password');
    return false;
  }

  const isPasswordCorrect = await user.comparePassword(userPw);
  if (!isPasswordCorrect) {
    console.log('Please provide correct Id or Password');
  }

  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  console.log(token);

  // res.status(StatusCode.OK).json({ user: { name: user.name }, token });

  // res.s
  return res
    .cookie('x-auth', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
    })
    .render('index.ejs');
};

const loginCheck = (req, res, next) => {
  console.log(req.cookies['userlogin']);
  // if (req.jwt) console.log('로그인있어용');
  // else {
  //   console.log('로그인 안됬어용');
  // }
};

const mypage = (req, res) => {
  res.send('--마이페이지');
};

const createUser = (req, res) => {
  const { userId, userPw, name } = req.body;
  User.create({ userId: userId, userPw: userPw, name: name })
    .then(function () {
      res.json({ message: 'Successfully create user' });
    })
    .catch(function () {});
};

module.exports = {
  login,
  loginCheck,
  mypage,
  createUser,
};
