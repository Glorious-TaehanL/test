const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('login.ejs', { message: '로그인 먼저 해주세요' });
    // res.send('로그인먼저하는게좋을껀데요?');
  }
};

module.exports = {
  isLoggedin,
};
