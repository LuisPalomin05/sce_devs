const pool = require("../config/db");

const busquedaGlobal = async (query, tenantId) => {
  const [results] = await pool.query(
    "CALL sp_busqueda_global(?, ?)",
    [query, tenantId]
  );
  return results[0];
};

module.exports = {
  busquedaGlobal
};