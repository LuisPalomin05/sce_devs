const express = require("express");
const cors = require("cors");

// Routes
const apiRouter = require("./routes/apiRoutes");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
<<<<<<< Updated upstream
const dashboardRoutes = require("./routes/dashboard.routes");
=======
const dashboardRoutes = require("./routes/dashboardRoutes");
// const productoRoutes = require("./routes/producto");
const productosRouter = require("./routes/productoRoutes");
const busquedaRoutes = require("./routes/busquedaRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const categoriaRoutes = require("./routes/categoria.routes");
const usuarioRoutes = require("./routes/usuarioRoutes");
>>>>>>> Stashed changes

// App
const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream
// Routes usage
app.use("/api/", apiRouter);
=======
app.use("/api", busquedaRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/producto", productosRouter);
app.use("/api/venta", ventasRoutes);
app.use("/api/productos", productosRouter);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/categoria", categoriaRoutes);
>>>>>>> Stashed changes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRoutes); // 👈 mejor así

module.exports = app;