const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, ventaController.getVentas);

router.get("/:id", authMiddleware, ventaController.getVentaById);

router.post("/", authMiddleware, ventaController.createVenta);

router.delete("/:id", authMiddleware, ventaController.deleteVenta);

module.exports = router;
