/**
 * @swagger
 * tags: [Auth]
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [email,password], properties: {
 *         email: { type: string }, password: { type: string, minLength: 6 }, role: { type: string, enum: [admin,user,chef] }, name: { type: string }
 *       }}}}
 *     responses:
 *       201: { description: Created }
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and get JWT
 *     responses: { 200: { description: OK } }
 * /auth/forgot:
 *   post:
 *     tags: [Auth]
 *     summary: Send password reset email
 * /auth/reset:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password with token
 */
import { Router } from 'express';
import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import { hashPassword, comparePassword } from '../utils/security.js';
import { signJwt } from '../middleware/auth.js';
import crypto from 'crypto';
import { sendResetEmail } from '../services/email.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role = 'user', name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already used' });
    const user = await User.create({ email, password: await hashPassword(password), role, name });
    return res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await comparePassword(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  return res.json({ token: signJwt(user), role: user.role });
});

router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: 'If that email exists, a link has been sent.' });
  const raw = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min
  await ResetToken.create({ user: user._id, tokenHash, expiresAt });
  const link = `${process.env.APP_BASE_URL}/auth/reset?token=${raw}&uid=${user._id}`;
  await sendResetEmail(user.email, link);
  return res.json({ message: 'If that email exists, a link has been sent.' });
});

router.post('/reset', async (req, res) => {
  const { uid, token, newPassword } = req.body;
  if (!uid || !token || !newPassword) return res.status(400).json({ message: 'Invalid payload' });
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const record = await ResetToken.findOne({ user: uid, tokenHash, used: false, expiresAt: { $gt: new Date() } });
  if (!record) return res.status(400).json({ message: 'Invalid or expired token' });
  const user = await User.findById(uid);
  user.password = await hashPassword(newPassword);
  await user.save();
  record.used = true;
  await record.save();
  return res.json({ message: 'Password reset successful' });
});

export default router;
