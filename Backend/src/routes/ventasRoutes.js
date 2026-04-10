const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");
const authMiddleware = require("../middlewares/authMiddleware");

// 📋 GET todas las ventas
router.get("/", authMiddleware, ventaController.getVentas);

// 🔍 GET una venta con detalles
router.get("/:id", authMiddleware, ventaController.getVentaById);

// ➕ POST crear venta
router.post("/", authMiddleware, ventaController.createVenta);

// ❌ DELETE venta
router.delete("/:id", authMiddleware, ventaController.deleteVenta);

module.exports = router;
