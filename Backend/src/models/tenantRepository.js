const pool = require("../config/db");

const getTenantsByGroupId = async (tenantGroupId) => {
    const [rows] = await pool.query(
        `SELECT 
                id_tenant,
                id_grupo_tenant,
                ruc,
                razon_social,
                'ADMIN' as rol
            FROM tenant
            WHERE id_grupo_tenant = ?;`,
    [tenantGroupId],
  );
  return rows;
};


module.exports = {
  getTenantsByGroupId
};
