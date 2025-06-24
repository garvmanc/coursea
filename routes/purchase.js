const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Course = require("../models/Course");

router.post("/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyPurchased = user.purchasedCourses.includes(courseId);
    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    user.purchasedCourses.push(courseId);
    await user.save();

    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;