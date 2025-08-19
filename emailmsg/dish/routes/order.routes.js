/**
 * @swagger
 * tags: [Chef]
 * /chef/orders:
 *   get: { tags: [Chef], summary: List my assigned orders }
 * /chef/orders/{id}/status:
 *   patch:
 *     tags: [Chef]
 *     summary: Update order status (Preparing → Out for Delivery → Delivered)
 */
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import Order, { ORDER_STATUS } from '../models/Order.js';

const router = Router();
router.use(auth, allow('chef'));

router.get('/orders', async (req, res) => {
  const orders = await Order.find({ chef: req.user.id }).populate('items.dish', 'name price');
  res.json(orders);
});

const nextMap = {
  'Order Received': 'Preparing',
  'Preparing': 'Out for Delivery',
  'Out for Delivery': 'Delivered',
  'Delivered': null
};

router.patch('/orders/:id/status', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (String(order.chef) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  const next = nextMap[order.status];
  if (!next) return res.status(409).json({ message: 'Order already Delivered' });

  order.status = next;
  await order.save();
  res.json({ id: order._id, status: order.status });
});

export default router;
