const Customer = require('../models/Customer');
const Notice = require('../models/Notice');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const NOTICE_ROW_COUNT = 12;

const registerCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body });
  const token = customer.createJWT();
  res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
  //   res.send('successfully request');
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  console.log(req.body);
  //   console.log(password);
  const user = await Customer.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const getNoticeList = async (req, res) => {
  const totalNotice = await (await Notice.find({}, 'id')).length;
  const requestNoticePage = req.params;
  const items = await Notice.find({})
    .sort({ id: -1 })
    .skip(NOTICE_ROW_COUNT * (requestNoticePage - 1))
    .limit(NOTICE_ROW_COUNT);
  res.status(StatusCodes.OK).json({ totalNotice, items });
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getNoticeList,
};
