const pool = require("../config/db");

const createCategoria = async (id_tenant, nombre) => {
  const [results] = await pool.query("CALL sp_create_categoria(?, ?)", [id_tenant, nombre]);
  return results[0][0].id;
};

const getCategoriaByTenantId = async (TenantId) => {
  const [results] = await pool.query("CALL sp_get_categorias(?)", [TenantId]);
  return results[0];
};

const updateCategoria = async (id, nombre) => {
  const [results] = await pool.query("CALL sp_update_categoria(?, ?)", [id, nombre]);
  return results[0][0].affected > 0;
};

const deleteCategoria = async (id) => {
  const [results] = await pool.query("CALL sp_delete_categoria(?)", [id]);
  return results[0][0].affected > 0;
};

module.exports = {
  getCategoriaByTenantId,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
