const pool = require("../config/db");

const getProductos = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_productos(?)", [tenantId]);
  return results[0];
};

const getCategorias = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_categorias(?)", [tenantId]);
  return results[0];
};

const createProducto = async (productoData) => {
  const { nombre, precio, stock, id_categoria, id_tenant } = productoData;
  const [results] = await pool.query("CALL sp_create_producto(?, ?, ?, ?, ?)", [nombre, precio, stock, id_categoria, id_tenant]);
  return results[0][0].id;
};

const updateProducto = async (id, productoData) => {
  const { nombre, precio, stock, id_categoria } = productoData;
  const [results] = await pool.query("CALL sp_update_producto(?, ?, ?, ?, ?)", [id, nombre, precio, stock, id_categoria]);
  return results[0][0].affected > 0;
};

const deleteProducto = async (id) => {
  const [results] = await pool.query("CALL sp_delete_producto(?)", [id]);
  return results[0][0].affected > 0;
};

const getProductoById = async (id) => {
  const [results] = await pool.query("CALL sp_get_producto_by_id(?)", [id]);
  return results[0][0];
};

module.exports = {
  getProductos,
  getCategorias,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoById
};