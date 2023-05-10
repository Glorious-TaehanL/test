const Customer = require('../models/Customer');

const getCustomerList = async (req, res) => {
  res.render('customer/customer-list.ejs', { user: req.user });
};

module.exports = {
  getCustomerList,
};
