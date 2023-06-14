const Order = require('../models/Order');

const displayOrderList = async (req, res) => {
  const orderList = await Order.find({});
  if (orderList.length != 0) {
    res.render('order/order-list.ejs', { user: req.user, orders: orderList });
  }
};

module.exports = {
  displayOrderList,
};
