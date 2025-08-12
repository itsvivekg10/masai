
const Mentor = require('../models/mentor.model');
const Session = require('../models/session.model');

async function createSession({ mentorId, topic, scheduledAt, durationMinutes, description }) {
  const mentor = await Mentor.findById(mentorId).select('isActive');
  if (!mentor) throw { status: 404, message: 'Mentor not found' };
  if (!mentor.isActive) throw { status: 400, message: 'Mentor is not active' };

  const session = await Session.create({
    mentorId, topic, scheduledAt, durationMinutes, description
  });
  return session;
}
module.exports = { createSession };
