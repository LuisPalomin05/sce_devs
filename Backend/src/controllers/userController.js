const userModel = require("../models/userModel");

const setTenantActiva = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { tenant_id } = req.body;

    const rows = await userModel.evalUserTenant(user_id, tenant_id);

    if (rows.length === 0) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await userModel.setUserTenant(user_id, tenant_id);

    res.json({ message: "Tenant activa actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  setTenantActiva,
};
