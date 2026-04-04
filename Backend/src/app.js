const express = require("express");
const cors = require("cors");

//Route
const apiRouter = require("./routes/apiRoutes");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

//app
const app = express();
app.use(cors());
app.use(express.json());

//app route

app.use("/api/", apiRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
