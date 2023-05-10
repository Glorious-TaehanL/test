const Customer = require('../models/Customer');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

/**
 * @brief [ Frontend-API ] registerCustomer
 *
 * @param {*} req req.body customer registration information
 * @param {*} res
 *
 * @return token and user name.
 */
const registerCustomer = async (req, res) => {
  const { id, name, email, password, phonenumber } = req.body;

  if (!id || !name || !email || !password || !phonenumber) {
    throw new CustomError.BadRequestError('회원가입에 필요한 정보를 모두 제공해주세요.');
  }

  const eqcustomer = Customer.findOne({ email: email });
  if (eqcustomer) {
    throw new CustomError.BadRequestError('이미 같은 이메일을 갖고있는 수강생이 있습니다.');
  }

  Sequences.findOneAndUpdate({ name: 'customer-number' }, { $inc: { counter: 1 } })
    .then((result) => {
      const { counter } = result;

      Customer.create({ num: counter, id, name, email, password, phonenumber }).then((customer) => {
        const token = customer.createJWT();
        res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
      });
    })
    .catch((err) => {
      throw new CustomError.NotFoundError(`No sequence with id : customer-number`);
    });
};

/**
 * @brief [ Frontend-API ] loginCustomer
 *
 * @param {*} req email and password
 * @param {*} res
 *
 * @return user information and token
 */
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
