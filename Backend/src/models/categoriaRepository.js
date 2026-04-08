const pool = require("../config/db");

// const createCategoria = async () => {

// }

// const deleteCategoria = async () => {

// }

// const updateCategoria = async () => {

// }

// const getCategoria = async () => {

// }

const getCategoriaByTenantId = async (TenantId) => {
  const [rows] = await pool.query(
    "SELECT id_categoria, nombre FROM categoria WHERE id_tenant = ?",
    [TenantId],
  );

  return rows;
};

module.exports = {
  getCategoriaByTenantId,
};
