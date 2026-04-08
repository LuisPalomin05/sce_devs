const express = require('express'); 
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const verifyToken = require("../middlewares/authMiddleware");


router.post('/');
router.put('/:id');

router.post('/getAllFromProductos',verifyToken, productoController.getAllProductos)

module.exports = router;