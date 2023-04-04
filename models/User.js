const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, 'Please provide user Id'],
    maxlength: 20,
  },
  userPw: {
    type: String,
    required: [true, 'Please enter password for your account'],
    minlength: [8, 'Your password must be a t leeast 8 characters long'],
    maxlength: 30,
  },
  name: {
    type: String,
    require: [true, 'Please provide user name'],
    minlength: 2,
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.userPw = await bcrypt.hash(this.userPw, salt);
});

UserSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.userPw);
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this.userId,
      name: this.name,
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model('users', UserSchema);
