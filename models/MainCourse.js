const mongoose = require('mongoose');

const MainCourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
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
});

module.exports = mongoose.model('main-courses', MainCourseSchema);
