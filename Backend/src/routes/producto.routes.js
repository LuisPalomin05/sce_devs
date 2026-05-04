const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const verifyToken = require("../middlewares/authMiddleware");
router.use(verifyToken);

router.get("/get-all", productoController.getAllProductos);
router.post("/create", productoController.createProduct);
router.put("/update/:id", productoController.editProducto);
router.get("/get-by-id/:id", productoController.getProductoById);
module.exports = router;
