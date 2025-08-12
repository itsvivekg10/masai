const express = require("express");
const appointModel = require("../model/appointment");
const doctorModel = require("../model/doctor.model");
const patientModel = require("../model/patient.model");

const appointmentRouter = express.Router();

appointmentRouter.post("/addConsultant", async (req, res) => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;

    // 1. Find doctor and patient
    const doctor = await doctorModel.findById(doctorId);
    const patient = await patientModel.findById(patientId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 2. Check active status
    if (!doctor.isActive) {
      return res.status(400).json({ message: "Doctor is not active" });
    }
    if (!patient.isActive) {
      return res.status(400).json({ message: "Patient is not active" });
    }

    // 3. Create appointment
    const newConsultation = await appointModel.create({
      doctorId,
      patientId,
      date,
      time,
      reason
    });

    res.status(201).json({
      message: "Consultation added successfully",
      data: newConsultation
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = appointmentRouter;
