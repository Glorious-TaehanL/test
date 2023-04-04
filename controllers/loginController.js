const User = require('../models/User');
const StatusCode = require('http-status-codes');
const JWT = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_KEY;

const login = async (req, res) => {
  const { userId, userPw } = req.body;

  //Login Information Null check
  if (!userId || !userPw) {
    console.log('Please provide Id and Password');
  }

  //Find user by Id
  const user = await User.findOne({ userId: userId });
  if (!user) {
    console.log('Please provide correct Id or Password');
    return false;
  }
  //Check the password entered by the customer
  const isPasswordCorrect = await user.comparePassword(userPw);
  if (!isPasswordCorrect) {
    console.log('Please provide correct Id or Password');
  }
  //Create token
  const token = user.createJWT();
  // res.status(StatusCode.OK).json({ user: { name: user.name }, token });
  res.cookie('jwt', token);
  return res.render('list.ejs');
};

const createUser = (req, res) => {
  const { userId, userPw, name } = req.body;
  User.create({ userId: userId, userPw: userPw, name: name })
    .then(function () {
      res.json({ message: 'Successfully create user' });
    })
    .catch(function () {});
};

module.exports = { login, createUser };
