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

    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE id_tenant = ?",
      [tenantId]
    );

    res.json(rows);

  } catch (error) {
    console.log("ERROR PRODUCTOS:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

module.exports = router;