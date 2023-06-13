const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *  schemas:
 *    MainCourseRequest:
 *      title: MainCourse Models
 *      required:
 *       - price
 *       - term
 *       - title
 *       - thumbnail
 *       - description
 *       - information
 *      properties:
 *        price:
 *         type: number
 *        term:
 *         type: number
 *        title:
 *         type: string
 *        thumbnail:
 *         type: string
 *        description:
 *         type: string
 *        information:
 *         type: string
 */
const MainCourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  customerCount: {
    type: Number,
    default: 0,
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
  information: {
    type: String,
    require: [true, 'Please provide Course information.'],
  },
  createtime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('main-courses', MainCourseSchema);
