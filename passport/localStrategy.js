const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId', // req.body.userId
        passwordField: 'userPw', // req.body.userPw
      },
      async (userId, userPw, done) => {
        try {
          const exUser = await User.findOne({ userId });
          if (exUser) {
            const isPasswordCorrect = await exUser.comparePassword(userPw);
            if (isPasswordCorrect) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
