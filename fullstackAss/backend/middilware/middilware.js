import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const verifyToken = async (req, res, next) => {
try {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ message: 'No token provided' });


const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.sub).select('-password');
if (!user) return res.status(401).json({ message: 'Invalid token user' });


req.user = user;
next();
} catch (e) {
return res.status(401).json({ message: 'Unauthorized', error: e.message });
}
};