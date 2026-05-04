const productoRepository = require('../models/productoRepository');

const getAllProductos = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const productos = await productoRepository.getProductos(tenantId);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

const getProductoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoRepository.getProductoById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("ERROR GET PRODUCTO:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

const createProducto = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { nombre, precio, stock, id_categoria } = req.body;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const id = await productoRepository.createProducto({
      nombre,
      precio,
      stock,
      id_categoria,
      id_tenant: tenantId
    });

    res.status(201).json({ id, message: "Producto creado" });
  } catch (error) {
    console.error("ERROR CREATE PRODUCTO:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

const editProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, id_categoria } = req.body;

    const updated = await productoRepository.updateProducto(id, {
      nombre,
      precio,
      stock,
      id_categoria
    });

    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error("ERROR UPDATE PRODUCTO:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await productoRepository.deleteProducto(id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("ERROR DELETE PRODUCTO:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

const getCategorias = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({ error: "Tenant requerido" });
    }

    const categorias = await productoRepository.getCategorias(tenantId);
    res.json(categorias);
  } catch (error) {
    console.error("ERROR CATEGORIAS:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

module.exports = {
  getAllProductos,
  getProductoByID,
  createProducto,
  editProducto,
  deleteProducto,
  getCategorias
};