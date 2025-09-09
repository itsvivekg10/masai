// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  customer_name: { type: String, required: true },
  items: [{ type: String }],
  total_amount: { type: Number, required: true },
  order_status: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
