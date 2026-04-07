const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/busqueda-global", async (req, res) => {
  const q = req.query.q;

  if (!q || q.trim() === "") return res.json([]);

  try {
    const [results] = await db.query(
      "SELECT id_producto AS id, nombre, 'almacen' AS tipo, 'almacen' AS ruta FROM producto WHERE nombre LIKE ? LIMIT 10",
      [`%${q}%`]
    );

    res.json(results);
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json([]);
  }
});

module.exports = router;