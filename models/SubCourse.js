const mongoose = require('mongoose');

const SubCourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  title: {
    type: String,
    require: [true, 'Please provide title.'],
  },
  maincategory: {
    type: String,
    require: [true, 'Please provide thumbnail image.'],
  },
  description: {
    type: String,
    require: [true, 'Please provide Course description.'],
  },
  link: {
    type: String,
    require: [true, 'Please provide Course video link.'],
  },
});

module.exports = mongoose.model('sub-courses', SubCourseSchema);
