const pool = require("../config/db");

const getUserById = async (idUser) => {
    const [rows] = await pool.query(
        `SELECT 
            id_usuario,
            nombres,
            apellidos,
            email,
            tenant_activo_id,
            'ADMIN' AS rol
            FROM usuario
            WHERE id_usuario = ?;`,
    [idUser],
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};


module.exports = {
  getUserById
};
