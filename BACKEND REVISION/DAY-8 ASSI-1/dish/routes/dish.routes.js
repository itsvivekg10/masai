/**
 * @swagger
 * tags: [Dishes]
 * /dishes:
 *   get: { tags: [Dishes], summary: List dishes }
 *   post:
 *     tags: [Dishes]
 *     summary: Create dish (admin)
 * /dishes/{id}:
 *   get: { tags: [Dishes], summary: Get dish }
 *   patch: { tags: [Dishes], summary: Update dish (admin) }
 *   delete: { tags: [Dishes], summary: Delete dish (admin) }
 */
import { Router } from 'express';
import Dish from '../models/Dish.js';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';

const router = Router();

router.get('/', async (_req, res) => res.json(await Dish.find()));

router.post('/', auth, allow('admin'), async (req, res) => {
  const dish = await Dish.create(req.body);
  res.status(201).json(dish);
});

router.get('/:id', async (req, res) => {
  const d = await Dish.findById(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.json(d);
});

router.patch('/:id', auth, allow('admin'), async (req, res) => {
  const d = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.json(d);
});

router.delete('/:id', auth, allow('admin'), async (req, res) => {
  const d = await Dish.findByIdAndDelete(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.status(204).send();
});

export default router;
