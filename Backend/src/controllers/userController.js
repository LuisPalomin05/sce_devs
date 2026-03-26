const userModel= require('../models/userModel');

const setEmpresaActiva = async (req, res) => {
  try {
    const user_id = req.user.id; 
    const { empresa_id } = req.body;

const rows = await userModel.evalUserEmpresa(user_id, empresa_id);    

    if (rows.length === 0) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await userModel.setUserEmpresa(user_id, empresa_id);

    res.json({ message: "Empresa activa actualizada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};



module.exports = {
    setEmpresaActiva
}








