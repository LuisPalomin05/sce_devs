const pool = require("../config/db");

const getVentas = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_ventas(?)", [tenantId]);
  return results[0];
};

const getVentaById = async (id, tenantId) => {
  const [cabecera] = await pool.query(
    `SELECT 
      v.id_venta,
      v.total,
      v.created_at,
      u.nombres
     FROM venta v
     LEFT JOIN usuario u ON v.id_usuario = u.id_usuario
     WHERE v.id_venta = ? AND v.id_tenant = ?
     LIMIT 1`,
    [id, tenantId]
  );

  if (!cabecera || cabecera.length === 0) return null;

  const [detalles] = await pool.query(
    `SELECT 
      vd.id_detalle,
      p.nombre,
      vd.cantidad,
      vd.precio_unitario,
      vd.subtotal
     FROM venta_detalle vd
     JOIN producto p ON vd.id_producto = p.id_producto
     WHERE vd.id_venta = ?`,
    [id]
  );

  return {
    ...cabecera[0],
    detalles: detalles || [],
  };
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