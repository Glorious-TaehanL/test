const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('로그인먼저하는게좋을껀데요?');
  }
};

module.exports = {
  isLoggedin,
};
