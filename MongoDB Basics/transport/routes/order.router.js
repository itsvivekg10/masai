    const express = require("express");
    const OrderModel = require("../model/model");

    const orderRouter = express.Router();
orderRouter.delete("/delete/:orderId", async(req,res)=>{
    try{
const {orderId}= req.params
const deleteOrder = await OrderModel.findByIdAndDelete(orderId) 
if (!deleteOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", deleteOrder });
    }catch(error){
         res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
//update 
orderRouter.patch("/update/:orderId", async(req,res)=>{
    try{
const {orderId}= req.params
const  updateData = req.body
const updateOrder = await OrderModel.findByIdAndUpdate(orderId,updateData,{new:true}) 
if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", updateOrder });
    }catch(error){
         res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
/////
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find(); // get all documents
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});
////
    orderRouter.post("/add-order", async (req, res) => {
    try {
        const order = await OrderModel.create(req.body);
        res.status(200).json({ msg: "Order added", data: order });
    } catch (err) {
        console.error("❌ Error adding order:", err);
        res.status(500).json({ error: "Failed to add order" });
    }
    });

    module.exports = orderRouter;
