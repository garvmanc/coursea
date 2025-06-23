const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const purchaseRoutes = require("./routes/purchase");
const userRoutes = require("./routes/user");

app.post