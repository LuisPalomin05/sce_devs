const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

router.get('/', productoController.getAllProductos);
router.get('/categorias', productoController.getCategorias);
router.get('/:id', productoController.getProductoByID);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.editProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;