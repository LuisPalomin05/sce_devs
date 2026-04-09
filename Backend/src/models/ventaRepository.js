const pool = require("../config/db");

const getVentas = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_ventas(?)", [tenantId]);
  return results[0];
};

const getVentaById = async (id, tenantId) => {
  const [results] = await pool.query("CALL sp_get_venta_by_id(?, ?)", [id, tenantId]);
  if (results[0].length === 0) return null;
  return results[0][0];
};

const createVenta = async (ventaData) => {
  const { total, id_usuario, id_tenant, detalles } = ventaData;
  const detallesJson = JSON.stringify(detalles);
  const [results] = await pool.query("CALL sp_create_venta(?, ?, ?, ?)", [total, id_usuario, id_tenant, detallesJson]);
  return results[0][0].id_venta;
};

const deleteVenta = async (id, tenantId) => {
  const [results] = await pool.query("CALL sp_delete_venta(?, ?)", [id, tenantId]);
  return results[0][0].affected > 0;
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
  deleteVenta
};