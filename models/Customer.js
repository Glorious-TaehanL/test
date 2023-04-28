/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterCustomerRequest:
 *      title: RegisterCustomerRequest
 *      required:
 *       - id
 *       - name
 *       - email
 *       - password
 *      properties:
 *        id:
 *         type: string
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CustomerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide id'],
    maxlength: 50,
    minlength: 3,
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
});

CustomerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.methods.createJWT = function () {
  return jwt.sign({ id: this.id, name: this.name }, process.env.JWT_FRONT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

CustomerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('customers', CustomerSchema);
