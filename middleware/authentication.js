const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.send('authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.send('authentication invalid');
  }
};

module.exports = authentication;
