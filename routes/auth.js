const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            error: "All fields required."
        });
    }

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                error: "User already exists."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({ name, email, password: hashedPassword });
        await newuser.save();

        res.status(201).json({
            message: "Signup successful"
        })
    }
    catch(err){
        res.status(500).json({
            error: "Server error"
        });
    }
});

router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
        return res.status(400).json({
            error: "email and password required."
        });
        try{
            const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                error: "Invalid credentials."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: "Invalid credentials."
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h"} );
        res.json({
            message: "Login successful", token
        });
        }
        catch(err){
            res.status(500).json({
                error: "Server error."
            });
        }
});

module.exports = router;