const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { nombres, apellidos, email, password, id_rol } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const userId = await userModel.createUser({
      nombres,
      apellidos,
      email,
      password_hash: hash,
      id_rol,
    });

    res.status(201).json({ message: "Usuario creado", userId });
  } catch (error) {
    res.status(500).json({ error: "Error en registro" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      {
        id: user.id_usuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
};

const findUserById = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await userModel.getProfile(id);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const tenantActivaId = user[0].tenant_activa_id;

    const tenants = user.map((u) => ({
      id_tenant: u.id_tenant,
      razon_social: u.razon_social,
      ruc: u.ruc,
      rol: u.rol,
    }));

    const tenant_activa =
      tenants.find((e) => e.id_tenant === tenantActivaId) || tenants[0];

    res.json({
      id: user[0].id_usuario,
      nombres: user[0].nombres,
      apellidos: user[0].apellidos,
      email: user[0].email,
      tenants,
      tenant_activa,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
};
module.exports = {
  register,
  login,
  findUserById,
};
