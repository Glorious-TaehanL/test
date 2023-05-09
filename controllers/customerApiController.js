const Customer = require('../models/Customer');
const Notice = require('../models/Notice');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const registerCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body });
  const token = customer.createJWT();
  res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await Customer.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registerCustomer,
  loginCustomer,
};
