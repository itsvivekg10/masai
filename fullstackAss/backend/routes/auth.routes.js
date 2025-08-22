import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';
import User from '../models/User.js';


const router = Router();


router.get('/', verifyToken, allowRoles('admin'), async (req, res) => {
const users = await User.find().select('-password');
res.json(users);
});


export default router;