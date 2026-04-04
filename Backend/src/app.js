const express = require("express");
const cors = require("cors");

// Routes
const apiRouter = require("./routes/apiRoutes");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboard.routes");

// App
const app = express();
app.use(cors());
app.use(express.json());

// Routes usage
app.use("/api/", apiRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRoutes); // 👈 mejor así

module.exports = app;