// index.js
const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/orderdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));


app.post("/seed", async (req, res) => {
  const sampleOrders = [
    { order_id: 1, customer_name: "John Doe", items: ["Laptop", "Mouse"], total_amount: 65000, order_status: "pending" },
    { order_id: 2, customer_name: "Jane Smith", items: ["Headphones", "Charger"], total_amount: 3000, order_status: "shipped" },
    { order_id: 3, customer_name: "Alice Johnson", items: ["Mobile Phone"], total_amount: 20000, order_status: "delivered" },
    { order_id: 4, customer_name: "Bob Brown", items: ["Tablet", "Keyboard"], total_amount: 15000, order_status: "pending" },
    { order_id: 5, customer_name: "Chris Green", items: ["Smartwatch"], total_amount: 7000, order_status: "shipped" },
  ];
  await Order.insertMany(sampleOrders);
  res.json({ message: "Sample data inserted" });
});


app.get("/orders/shipped", async (req, res) => {
  const orders = await Order.find({ order_status: "shipped" });
  res.json(orders);
});

app.put("/orders/update-amount", async (req, res) => {
  await Order.updateOne({ order_id: 1 }, { $set: { total_amount: 70000 } });
  res.json({ message: "Order amount updated" });
});

app.delete("/orders/delete/:id", async (req, res) => {
  await Order.deleteOne({ order_id: Number(req.params.id) });
  res.json({ message: "Order deleted" });
});

app.get("/orders/alice", async (req, res) => {
  const order = await Order.findOne({ customer_name: "Alice Johnson" });
  res.json(order);
});

app.put("/orders/update-status", async (req, res) => {
  await Order.updateOne({ order_id: 2 }, { $set: { order_status: "delivered" } });
  res.json({ message: "Order status updated" });
});

app.get("/orders/expensive", async (req, res) => {
  const orders = await Order.find({ total_amount: { $gte: 15000 } });
  res.json(orders);
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
