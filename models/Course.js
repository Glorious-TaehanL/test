const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({});

module.exports = mongoose.model('courses', CourseSchema);
