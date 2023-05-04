const User = require('../models/Customer');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('login.ejs', { message: '로그인 먼저 해주세요' });
    // res.send('로그인먼저하는게좋을껀데요?');
  }
};

module.exports = {
  auth,
  isLoggedin,
};
