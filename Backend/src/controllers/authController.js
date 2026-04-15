const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

<<<<<<< Updated upstream
=======
const userRepository = require("../models/userRepository");
const { getUserById } = require("../models/userRepository");
const { getTenantsByUserId } = require("../models/tenantRepository");

// 🔹 REGISTER
>>>>>>> Stashed changes
const register = async (req, res) => {
  try {
    const { nombres, apellidos, email, password, id_rol } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password inválido" });
    }

    const hash = await bcrypt.hash(password, 10);

    // ⚠️ necesitas tenantId (puedes ajustar esto según tu lógica)
    const tenantId = req.user?.tenantId || 1;

    const result = await userRepository.createUser(
      {
        nombres,
        apellidos,
        email,
        password_hash: hash,
        id_rol,
      },
      tenantId
    );

    res.status(201).json({
      message: "Usuario creado",
      userId: result.id_usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en registro" });
  }
};

// 🔹 LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    await userRepository.updateLastLogin(user.id_usuario);

    const token = jwt.sign(
      {
        id: user.id_usuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
};

// 🔹 PERFIL
const findUserById = async (req, res) => {
  try {
    const id = req.user.id;
<<<<<<< Updated upstream
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
=======

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const tenants = (await getTenantsByUserId(id)) || [];

    let tenant_activa = tenants.find(
      (t) => t.id_tenant === user.tenant_activo_id
    );

    if (!tenant_activa && tenants.length > 0) {
      tenant_activa = tenants[0];
    }
>>>>>>> Stashed changes

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