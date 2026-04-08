const express = require('express'); 
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const categoriaController = require('../controllers/categoria.controller')


router.get('getCategoriaByTenantId', verifyToken, categoriaController.getCategoriaByTenantId);
// router.post();
// router.post();


module.exports = router;