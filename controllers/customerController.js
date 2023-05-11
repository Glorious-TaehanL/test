const Customer = require('../models/Customer');

const getCustomerList = async (req, res) => {
  const customerlist = await Customer.find({});
  res.render('customer/customer-list.ejs', { user: req.user, customers: customerlist });
};

module.exports = {
  getCustomerList,
};
