const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/**
 * @swagger
 * components:
 *  schemas:
 *    CustomerRequest:
 *      title: Customer Models
 *      required:
 *       - num
 *       - name
 *       - email
 *       - password
 *      properties:
 *        num:
 *         type: number
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *        phonenumber:
 *         type: number
 */

const CustomerSchema = new mongoose.Schema({
  num: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [8, 'Your password must be a t leeast 8 characters long'],
  },
  phonenumber: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  accesscourse: {
    type: [Number],
  },
  abandonedcart: {
    type: [Number],
  },
});

CustomerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

CustomerSchema.methods.createJWT = function () {
  return jwt.sign({ num: this.num, email: this.email, name: this.name, accesscourse: this.accesscourse }, process.env.JWT_FRONT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

CustomerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('customers', CustomerSchema);
