const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: Number,
  totalAmount: Number,
  orderStatus: Boolean,
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
