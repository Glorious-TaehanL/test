const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Please provide title.'],
  },
  content: {
    type: String,
    require: [true, 'Please provide content.'],
  },
});

module.exports = mongoose.model('notices', NoticeSchema);
