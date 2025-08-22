import { Router } from 'express';
import { body, param } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';
import { runValidation } from '../middleware/validate.js';
import Resource from '../models/Resource.js';


const router = Router();


// Access policy:
// - user: CRUD only own resources
// - moderator: CRUD any resource
// - admin: CRUD any resource


const canModifyAny = (role) => role === 'admin' || role === 'moderator';


// CREATE
router.post(
'/',
verifyToken,
[body('title').isString().isLength({ min: 1 }), body('body').isString().isLength({ min: 1 })],
runValidation,
async (req, res) => {
const doc = await Resource.create({ title: req.body.title, body: req.body.body, owner: req.user._id });
res.status(201).json(doc);
}
);


// LIST (all for mods/admins; own only for user)
router.get('/', verifyToken, async (req, res) => {
const filter = canModifyAny(req.user.role) ? {} : { owner: req.user._id };
const docs = await Resource.find(filter).sort({ createdAt: -1 });
res.json(docs);
});


// READ one
router.get('/:id', verifyToken, async (req, res) => {
const doc = await Resource.findById(req.params.id);
if (!doc) return res.status(404).json({ message: 'Not found' });
if (!canModifyAny(req.user.role) && String(doc.owner) !== String(req.user._id)) {
return res.status(403).json({ message: 'Forbidden' });
}
res.json(doc);
});


// UPDATE
router.put(
'/:id',
verifyToken,
[param('id').isMongoId(), body('title').optional().isString(), body('body').optional().isString()],
runValidation,
async (req, res) => {
const doc = await Resource.findById(req.params.id);
if (!doc) return res.status(404).json({ message: 'Not found' });
if (!canModifyAny(req.user.role) && String(doc.owner) !== String(req.user._id)) {
return res.status(403).json({ message: 'Forbidden' });
}
if (req.body.title !== undefined) doc.title = req.body.title;
if (req.body.body !== undefined) doc.body = req.body.body;
export default router;