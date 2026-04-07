const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET productos por tenant
router.get("/", async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const [rows] = await pool.query(`
  SELECT 
    p.id_producto,
    p.nombre,
    p.precio,
    p.stock,
    p.id_categoria,
    c.nombre AS categoria
  FROM producto p
  LEFT JOIN categoria c 
    ON p.id_categoria = c.id_categoria
  WHERE p.id_tenant = ?
`, [tenantId]);

    res.json(rows);

  } catch (error) {
    console.log("ERROR PRODUCTOS:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

router.get("/categorias", async (req, res) => {
  const tenantId = parseInt(req.headers["x-tenant-id"]);

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant requerido" });
  }

  try {
    const [results] = await pool.query(
      "SELECT id_categoria, nombre FROM categoria WHERE id_tenant = ?",
      [tenantId]
    );

    res.json(results);
  } catch (err) {
    console.error("ERROR CATEGORIAS:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const tenantId = req.headers["x-tenant-id"];
  const { nombre, precio, stock, id_categoria } = req.body;

  if (!tenantId) {
    return res.status(400).json({ message: "Tenant requerido" });
  }

  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ message: "Nombre de producto requerido" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO producto (nombre, precio, stock, id_categoria, id_tenant) VALUES (?, ?, ?, ?, ?)`,
      [nombre, precio || 0, stock || 0, id_categoria || null, tenantId]
    );

    const [rows] = await pool.query(
      `SELECT p.id_producto, p.nombre, p.precio, p.stock, p.id_categoria, c.nombre AS categoria
       FROM producto p
       LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = ? AND p.id_tenant = ?`,
      [result.insertId, tenantId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("ERROR CREAR PRODUCTO:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
});

router.put("/:id", async (req, res) => {
  const tenantId = req.headers["x-tenant-id"];
  const { id } = req.params;
  const { nombre, precio, stock, id_categoria } = req.body;

  if (!tenantId) {
    return res.status(400).json({ message: "Tenant requerido" });
  }

  try {
    await pool.query(
      `UPDATE producto SET nombre = ?, precio = ?, stock = ?, id_categoria = ? WHERE id_producto = ? AND id_tenant = ?`,
      [nombre, precio || 0, stock || 0, id_categoria || null, id, tenantId]
    );

    const [rows] = await pool.query(
      `SELECT p.id_producto, p.nombre, p.precio, p.stock, p.id_categoria, c.nombre AS categoria
       FROM producto p
       LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = ? AND p.id_tenant = ?`,
      [id, tenantId]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error("ERROR ACTUALIZAR PRODUCTO:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

router.delete("/:id", async (req, res) => {
  const tenantId = req.headers["x-tenant-id"];
  const { id } = req.params;

  if (!tenantId) {
    return res.status(400).json({ message: "Tenant requerido" });
  }

  try {
    await pool.query(
      `DELETE FROM producto WHERE id_producto = ? AND id_tenant = ?`,
      [id, tenantId]
    );

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("ERROR ELIMINAR PRODUCTO:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

module.exports = router;