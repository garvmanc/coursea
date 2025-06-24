const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

router.get("/me", authMiddleware, async(req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("purchasedCourses");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ courses: user.purchasedCourses });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;