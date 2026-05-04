const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const userRepository = require("../models/userRepository");
const bcrypt = require("bcrypt");

router.get("/", verifyToken, async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const usuarios = await userRepository.findUsers(tenantId);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

router.get("/roles", verifyToken, async (req, res) => {
  try {
    const roles = await userRepository.getRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener roles" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const usuario = await userRepository.getUserById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "No encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { nombres, apellidos, email, id_rol } = req.body;
    const password_hash = await bcrypt.hash("Temporal123!", 10);

    const result = await userRepository.createUser(
      { nombres, apellidos, email, password_hash, id_rol },
      tenantId
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const updated = await userRepository.updateUser(
      req.params.id,
      req.body,
      tenantId
    );
    res.json({ success: updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await userRepository.deleteUser(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

module.exports = router;