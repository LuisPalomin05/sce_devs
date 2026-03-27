const pool = require("../config/db");

const createUser = async (user) => {
  const { nombres, apellidos, email, password_hash, id_rol } = user;

  const [result] = await pool.query(
    `INSERT INTO usuario (nombres, apellidos, email, password_hash) VALUES (?, ?, ?, ?)`,
    [nombres, apellidos, email, password_hash, id_rol],
  );

  return result.insertId;
};

const findUsers = async () => {
  const [rows] = await pool.query(`SELECT id_usuario, nombres FROM usuario`);

  return rows[0];
};

const findByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM usuario WHERE email = ?`, [
    email,
  ]);

  return rows[0];
};

const getProfile = async (idUser) => {
  const [rows] = await pool.query(
    `SELECT 
  u.id_usuario,
  u.nombres,
  u.apellidos,
  u.email,
  e.id_tenant,
  e.razon_social,
  e.ruc,
  r.nombre AS rol
FROM usuario u
JOIN usuario_tenant ue ON u.id_usuario = ue.id_usuario
JOIN tenant e ON ue.id_tenant = e.id_tenant
JOIN rol r ON ue.id_rol = r.id_rol
WHERE u.id_usuario = ?;`,
    [idUser],
  );

  return rows;
};

const evalUserTenant = async (userId, tenantId) => {
  const [rows] = await pool.query(
    `
      SELECT 1
      FROM usuario_tenant
      WHERE id_usuario = ? AND id_tenant = ?
    `,
    [userId, tenantId],
  );

  return rows;
};

const setUserTenant = async (userId, tenantId) => {
  await pool.query(
    `
    UPDATE usuario
    SET tenant_activa_id = ?
    WHERE id_usuario = ?
  `,
    [tenantId, userId],
  );
};

const newPassword = async (newPass, user_id) =>{
await pool.query(`UPDATE usuario SET password_hash = ? WHERE id_usuario = ?`, [newPass, user_id]);

}

module.exports = {
  createUser,
  findByEmail,
  findUsers,
  getProfile,
  evalUserTenant,
  setUserTenant,
  newPassword
};
