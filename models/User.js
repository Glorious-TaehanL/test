const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, 'Please provide user Id'],
    maxlength: 20,
  },
  userPw: {
    type: String,
    require: [true, 'Please provide user password'],
    minlength: 6,
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

module.exports = mongoose.model('users', UserSchema);
