const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/busqueda-global", async (req, res) => {
  const q = req.query.q;
  const tenantId = req.query.tenant_id; // 👈 recibe del frontend

  if (!q || q.trim() === "") return res.json([]);
  if (!tenantId) return res.status(400).json({ error: "Falta tenant_id" });

  try {
    const [results] = await db.query(
      "CALL sp_busqueda_global(?, ?)",
      [q, tenantId]
    );

    res.json(results[0]);
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json([]);
  }
});

module.exports = router;