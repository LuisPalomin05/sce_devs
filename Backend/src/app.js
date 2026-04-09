const express = require("express");
const cors = require("cors");

// Routes
const apiRouter = require("./routes/apiRoutes");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productoRoutes = require("./routes/productoRoutes");
const busquedaRoutes = require("./routes/busquedaRoutes");
const ventasRoutes = require("./routes/ventasRoutes");

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
}));

app.use(express.json());

app.use("/api", busquedaRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/venta", ventasRoutes);
app.use("/api/", apiRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;