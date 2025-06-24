const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;