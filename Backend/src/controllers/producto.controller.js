const prodRepository = require("../models/productoRepository");

const getAllProductos = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const productos = await prodRepository.getAllFromProductos(tenantId);

    res.status(200).json({
      success: true,
      data: productos,
    });
  } catch (error) {
    console.log("ERROR PRODUCTOS:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

const createProduct = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { nombre, precio, stock, id_categoria } = req.body;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre de producto requerido" });
    }

    const insertId = await prodRepository.createProducto(
      nombre,
      precio,
      stock,
      id_categoria,
      tenantId,
    );

    const nuevoProducto = await prodRepository.getProducto(insertId, tenantId);

    res.status(201).json({
      success: true,
      data: nuevoProducto,
    });
  } catch (error) {
    console.error("ERROR CREAR PRODUCTO:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

const getProductoById = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const producto = await prodRepository.getProducto(id, tenantId);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.log("ERROR PRODUCTOS:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// const deleteProducto = async (req, res) => {
//     try {

//     } catch (error) {
//     console.log("ERROR PRODUCTOS:", error);
//     res.status(500).json({ message: "Error al obtener productos" });

//     }
// }

const editProducto = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;
    const { nombre, precio, stock, id_categoria } = req.body;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const affectedRows = await prodRepository.updateProducto(
      id,
      nombre,
      precio,
      stock,
      id_categoria,
      tenantId,
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const productoActualizado = await prodRepository.getProducto(id, tenantId);

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.log("ERROR PRODUCTOS:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

module.exports = {
  getAllProductos,
  createProduct,
  editProducto,
  getProductoById,
};
