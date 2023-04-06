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
              done(null, exUser); //? 성공이면 done()의 2번째 인수에 선언
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //? 실패면 done()의 2번째 인수는 false로 주고 3번째 인수에 선언
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error); //? done()의 첫번째 함수는 err용. 특별한것 없는 평소에는 null로 처리.
        }
      }
    )
  );
};
