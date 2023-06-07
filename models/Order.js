const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *  schemas:
 *    OrderSchema:
 *      title: Order Models
 *      required:
 *       - customerid
 *       - amount
 *       - courses
 *       - paymentid
 *      properties:
 *        customerid:
 *         type: number
 *        amount:
 *         type: number
 *        courses:
 *         type: [number]
 *        paymentid:
 *         type: string
 */
const OrderSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, 'Please provide sequence number'],
  },
  customerid: {
    type: Number,
    require: [true, 'Please provide customer Id'],
  },
  amount: {
    type: Number,
    require: [true, 'Please provide order amount'],
  },
  courses: {
    type: [Number],
    require: [true, 'Please provide paid courses Id.'],
  },
  paymentid: {
    type: String,
    require: [true, 'Please provide payment id.'],
  },
  createtime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('orders', OrderSchema);
