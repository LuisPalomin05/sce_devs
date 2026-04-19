const pool = require("../config/db");

const getDashboardData = async (tenantId) => {
  const [results] = await pool.query("CALL sp_dashboard(?)", [tenantId]);

  const ventasHoy = results[0][0].ventasHoy;
  const ventasMes = results[1][0].ventasMes;
  const productos = results[2][0].productos;
  const usuarios = results[3][0].usuarios;

  const grafico = results[4];
  const pedidosRaw = results[5];

  return {
    ventasHoy,
    ventasMes,
    productos,
    usuarios,
    grafico,
    pedidosRaw
  };
};

const getVentasAyer = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_ventas_ayer(?)", [tenantId]);
  return results[0][0].total;
};

const getVentasMesPasado = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_ventas_mes_pasado(?)", [tenantId]);
  return results[0][0].total;
};

const getActividadReciente = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_actividad_reciente(?)", [tenantId]);
  return results[0];
};

const getStockBajo = async (tenantId) => {
  const [results] = await pool.query("CALL sp_get_stock_bajo(?)", [tenantId]);
  return results[0];
};

module.exports = {
  getDashboardData,
  getVentasAyer,
  getVentasMesPasado,
  getActividadReciente,
  getStockBajo
};