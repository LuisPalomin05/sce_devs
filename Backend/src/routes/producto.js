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

module.exports = router;