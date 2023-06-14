const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *  schemas:
 *    OrderSchema:
 *      title: Order Models
 *      required:
 *       - customerid
 *       - customername
 *       - amount
 *       - title
 *       - courses
 *       - paymentid
 *      properties:
 *        customerid:
 *         type: number
 *        customername:
 *         type: string
 *        amount:
 *         type: number
 *        title:
 *         type: string
 *        courses:
 *         type: [number]
 *        paymentid:
 *         type: string
 */
const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, 'Please provide sequence number'],
  },
  customerid: {
    type: Number,
    require: [true, 'Please provide customer Id'],
  },
  customername: {
    type: String,
    require: [true, 'Please provide customer Name'],
  },
  amount: {
    type: Number,
    require: [true, 'Please provide order amount'],
  },
  title: {
    type: String,
    require: [true, 'Please provide orders title'],
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
