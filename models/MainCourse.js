const mongoose = require('mongoose');

const MainCourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  price: {
    type: Number,
    require: [true, 'Please provide course price'],
  },
  term: {
    type: Number,
    require: [true, 'Please provide sub content term period'],
  },
  title: {
    type: String,
    require: [true, 'Please provide title.'],
  },
  thumbnail: {
    type: String,
    require: [true, 'Please provide thumbnail image.'],
  },
  description: {
    type: String,
    require: [true, 'Please provide Course description.'],
  },
  createtime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('main-courses', MainCourseSchema);
