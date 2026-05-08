const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const tenantMiddleware = require("../middlewares/tenantMiddleware");
const categoriaController = require("../controllers/categoria.controller");

router.use(verifyToken);
router.use(tenantMiddleware);

router.get("/get-all", categoriaController.getAllCategorias);
router.post("/create", categoriaController.createCategorias);
module.exports = router;
