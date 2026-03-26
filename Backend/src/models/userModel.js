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
  const [rows] = await pool.query(`
    SELECT 
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.email,
      u.empresa_activa_id,
      e.id_empresa,
      e.razon_social,
      e.ruc,
      r.nombre AS rol
    FROM usuario u
    JOIN usuario_empresa ue ON u.id_usuario = ue.id_usuario
    JOIN empresa e ON ue.id_empresa = e.id_empresa
    JOIN rol r ON ue.id_rol = r.id_rol
    WHERE u.id_usuario = ?
  `, [idUser]);

  return rows;
};

const evalUserEmpresa = async (userId, empresaId) =>{

    const [rows] = await pool.query(`
      SELECT 1
      FROM usuario_empresa
      WHERE id_usuario = ? AND id_empresa = ?
    `, [userId, empresaId]);

    return rows;


}

const setUserEmpresa = async (userId, empresaId) => {
  await pool.query(`
    UPDATE usuario
    SET empresa_activa_id = ?
    WHERE id_usuario = ?
  `, [empresaId, userId]); }


module.exports = { createUser, findByEmail, findUsers, getProfile, evalUserEmpresa, setUserEmpresa };
