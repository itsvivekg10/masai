import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';
import { runValidation } from '../middleware/validate.js';
import User from '../models/User.js';


const router = Router();


// GET own profile
router.get('/', verifyToken, async (req, res) => {
res.json(req.user);
});


// UPDATE own profile
router.put(
'/',
verifyToken,
[
body('profile.fullName').optional().isString(),
body('profile.age').optional().isInt({ min: 0 }),
body('profile.gender').optional().isString()
],
runValidation,
async (req, res) => {
const { profile } = req.body;
const user = await User.findByIdAndUpdate(
req.user._id,
{ $set: { profile: { ...req.user.profile?.toObject?.(), ...profile } } },
{ new: true }
).select('-password');
res.json({ message: 'Profile updated', user });
}
);


export default router;+