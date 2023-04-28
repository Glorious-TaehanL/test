const Customer = require('../models/Customer');
const { StatusCodes } = require('http-status-codes');

const registerCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body });
  const token = customer.createJWT();
  res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
  //   res.send('successfully request');
};

module.exports = {
  registerCustomer,
};
