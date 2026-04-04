const pool = require("../config/db");

const getTenantsByUserId = async (idUser) => {
  const [rows] = await pool.query(
    `SELECT 
        t.id_tenant,
        t.ruc,
        t.razon_social
     FROM usuario_tenant ut
     JOIN tenant t ON ut.id_tenant = t.id_tenant
     WHERE ut.id_usuario = ?`,
    [idUser]
  );

  return rows;
}

module.exports = {
  getTenantsByUserId
};
