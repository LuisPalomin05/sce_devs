const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const tenantMiddleware = require("../middlewares/tenantMiddleware");
const productoController = require("../controllers/producto.controller");

router.use(verifyToken);
router.use(tenantMiddleware);

router.get("/get-all", productoController.getAllProductos);
router.post("/create", productoController.createProducto);
router.put("/update/:id", productoController.editProducto);
router.get("/get-by-id/:id", productoController.getProductoByID);
router.delete("/delete/:id", productoController.deleteProducto);
module.exports = router;
