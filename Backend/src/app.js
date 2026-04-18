const express = require("express");
const cors = require("cors");

// Routes
const statusRoutes = require("./routes/apiRoutes");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// const productoRoutes = require("./routes/producto");
const productosRouter = require("./routes/productoRoutes");
const busquedaRoutes = require("./routes/busquedaRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const categoriaRoutes = require("./routes/categoria.routes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
  }),
);

app.use(express.json());

app.use("/api", busquedaRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/producto", productosRouter);
app.use("/api/venta", ventasRoutes);
app.use("/api/productos", productosRouter);
app.use("/api/categoria", categoriaRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
