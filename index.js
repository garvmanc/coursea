require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const purchaseRoutes = require("./routes/purchase");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/user", userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected"))
.catch((err) => console.error("Connection error: ", err));

app.listen(3000);