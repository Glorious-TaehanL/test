const Customer = require('../models/Customer');

const getCustomerList = async (req, res) => {
  const customerlist = await Customer.find({}).sort({ num: -1 });
  res.render('customer/customer-list.ejs', { user: req.user, customers: customerlist });
};

const deleteCustomer = async (req, res) => {};

module.exports = {
  getCustomerList,
};
