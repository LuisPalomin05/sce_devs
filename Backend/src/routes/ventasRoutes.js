const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");
const verifyToken = require("../middlewares/authMiddleware");
const tenantMiddleware = require("../middlewares/tenantMiddleware");

router.use(verifyToken);
router.use(tenantMiddleware);

router.get("/", ventaController.getVentas);

router.get("/:id", ventaController.getVentaById);

router.post("/", ventaController.createVenta);

router.delete("/:id", ventaController.deleteVenta);

module.exports = router;
