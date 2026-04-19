const userRepository = require("../models/userRepository");
const bcrypt = require('bcrypt');


const setTenantActiva = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { tenant_id } = req.body;

    const rows = await userRepository.evalUserTenant(user_id, tenant_id);

    if (rows.length === 0) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await userRepository.setUserTenant(user_id, tenant_id);

    res.json({ message: "Tenant activa actualizada" });
  } catch (error) {

    res.status(500).json({ message: "Error del servidor" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Contraseña inválida" });
    }

    const password_hash = await bcrypt.hash(password, 10);


    await userRepository.newPassword(password_hash, user_id);

    res.status(200).json({ message: "actividad actualizada" });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }

}

module.exports = {
  setTenantActiva, updatePassword
};
