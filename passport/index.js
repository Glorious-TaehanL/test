const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/User');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then(function (user) {
      done(null, user);
    });
  });
  local();
};
