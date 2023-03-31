const User = require('../models/User');
const JWT = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_KEY;

const login = (req, res) => {
  console.log(req.body);
};

const createUser = (req, res) => {
  const { userId, userPw, name } = req.body;
  //   console.log(userId + userPw + name);
  //   console.log(req.body);
  User.create({ userId: userId, userPw: userPw, name: name })
    .then(function () {
      // console.log(req.body);
      res.json({ message: 'Successfully create user' });
    })
    .catch(function () {});
};

module.exports = { login, createUser };
