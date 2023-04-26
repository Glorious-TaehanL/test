const mongoose = require('mongoose');

const SubCourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Please provide sequence number.'],
  },
  indexnumber: {
    type: Number,
    required: [true, 'Please provide subcourse index number.'],
  },
  title: {
    type: String,
    required: [true, 'Please provide title.'],
  },
  maincategory: {
    type: String,
    required: [true, 'Please provide parent main course category Id.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide Course description.'],
  },
  link: {
    type: String,
    required: [true, 'Please provide Course video link.'],
  },
});

module.exports = mongoose.model('sub-courses', SubCourseSchema);
