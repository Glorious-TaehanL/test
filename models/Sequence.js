const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  counter: {
    type: Number,
  },
});

module.exports = mongoose.model('sequences', SequenceSchema);
