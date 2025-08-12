const express = require("express");
const enrollModel = require("../models/enrollment.model");
const lmsRoutes = express.Router();

// POST /enroll - Enroll a student into a course
lmsRoutes.post("/enroll", async (req, res) => {
    try {
        const { courseId, studentId } = req.body;

        // Validate input
        if (!courseId || !studentId) {
            return res.status(400).json({ error: "courseId and studentId are required" });
        }

        // Prevent duplicate enrollments (optional but recommended if you added unique index)
        const existing = await enrollModel.findOne({ courseId, studentId });
        if (existing) {
            return res.status(409).json({ error: "Student is already enrolled in this course" });
        }

        // Create new enrollment
        const enrolldata = await enrollModel.create({ courseId, studentId });

        res.status(201).json({ success: true, data: enrolldata });
    } catch (error) {
        console.error("Error during enrollment:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = lmsRoutes;
