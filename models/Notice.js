const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  title: {
    type: String,
    require: [true, 'Please provide title.'],
  },
  content: {
    type: String,
    require: [true, 'Please provide content.'],
  },
  createTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('notices', NoticeSchema);
