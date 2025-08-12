
const mongoose = require('mongoose');
const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: String,
  bio: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
MentorSchema.index({ isActive: 1 });
module.exports = mongoose.model('Mentor', MentorSchema);


const mongoose = require('mongoose');
const LearnerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
LearnerSchema.index({ isActive: 1 });
module.exports = mongoose.model('Learner', LearnerSchema);


const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner', required: true },
  status: { type: String, enum: ['booked','attended','cancelled','no-show'], default: 'booked' },
  joinedAt: Date,
  feedback: String,
  rating: { type: Number, min: 1, max: 5 }
}, { _id: false });

const SessionSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  topic: { type: String, required: true },
  description: String,
  scheduledAt: { type: Date, required: true },    
  durationMinutes: Number,
  notes: String,
  attendance: { type: [AttendanceSchema], default: [] },
  isActive: { type: Boolean, default: true },      
  isArchived: { type: Boolean, default: false },   
  createdAt: { type: Date, default: Date.now }
});


SessionSchema.index({ mentorId: 1, scheduledAt: -1, isArchived: 1, isActive: 1 });
SessionSchema.index({ 'attendance.learnerId': 1 });

module.exports = mongoose.model('Session', SessionSchema);
