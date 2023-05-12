const configData = (req, res) => {
  res.render('settings.ejs', { user: req.user });
};

module.exports = {
  configData,
};
