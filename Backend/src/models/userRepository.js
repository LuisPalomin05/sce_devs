const pool = require("../config/db");

// 🔹 Crear usuario (SP)
const createUser = async (user, tenantId) => {
  const { nombres, apellidos, email, password_hash, id_rol } = user;

  const [rows] = await pool.query(
    "CALL sp_create_usuario(?, ?, ?, ?, ?, ?)",
    [nombres, apellidos, email, password_hash, tenantId, id_rol]
  );

  return rows[0][0];
};

// 🔹 Listar usuarios
const findUsers = async (tenantId) => {
  const [rows] = await pool.query("CALL sp_get_usuarios(?)", [tenantId]);
  return rows[0];
};

// 🔹 Buscar por email
const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );
  return rows[0];
};

const updateLastLogin = async (id_usuario) => {
  return pool.query(
    `UPDATE usuario SET last_login = NOW() WHERE id_usuario = ?`,
    [id_usuario]
  );
};

// 🔹 Perfil
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
    JOIN usuario_tenant ut ON u.id_usuario = ut.id_usuario
    JOIN tenant e ON ut.id_tenant = e.id_tenant
    JOIN rol r ON ut.id_rol = r.id_rol
    WHERE u.id_usuario = ?`,
    [idUser]
  );

  return rows[0];
};

// 🔹 Validar tenant
const evalUserTenant = async (userId, tenantId) => {
  const [rows] = await pool.query(
    `SELECT 1 FROM usuario_tenant WHERE id_usuario = ? AND id_tenant = ?`,
    [userId, tenantId]
  );

  return rows;
};

// 🔹 Set tenant activo
const setUserTenant = async (userId, tenantId) => {
  await pool.query(
    `UPDATE usuario SET tenant_activo_id = ? WHERE id_usuario = ?`,
    [tenantId, userId]
  );
};

// 🔹 Cambiar contraseña
const newPassword = async (newPass, user_id) => {
  await pool.query(
    `UPDATE usuario SET password_hash = ? WHERE id_usuario = ?`,
    [newPass, user_id]
  );
};

// 🔹 Actualizar usuario + rol
const updateUser = async (id, data, tenantId) => {
  const { nombres, apellidos, email, id_rol } = data;

  const [rows] = await pool.query(
    "CALL sp_update_usuario(?, ?, ?, ?, ?, ?)",
    [id, nombres, apellidos, email, id_rol, tenantId]
  );

  return rows[0][0].affected > 0;
};

// 🔹 Eliminar
const deleteUser = async (id) => {
  await pool.query("CALL sp_delete_usuario(?)", [id]);
  return true;
};

// 🔹 Obtener por ID
const getUserById = async (id) => {
  const [rows] = await pool.query("CALL sp_get_usuario_by_id(?)", [id]);
  return rows[0][0];
};

// 🔹 Roles
const getRoles = async () => {
  const [rows] = await pool.query("CALL sp_get_roles()");
  return rows[0];
};

module.exports = {
  createUser,
  findByEmail,
  findUsers,
  getProfile,
  evalUserTenant,
  setUserTenant,
  newPassword,
  updateUser,
  deleteUser,
  getUserById,
  getRoles,
  updateLastLogin,
};