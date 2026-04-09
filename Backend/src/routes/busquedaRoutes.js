const express = require("express");
const router = express.Router();
const busquedaRepository = require("../models/busquedaRepository");

router.get("/busqueda-global", async (req, res) => {
  const q = req.query.q;
  const tenantId = req.query.tenant_id;

  if (!q || q.trim() === "") return res.json([]);
  if (!tenantId) return res.status(400).json({ error: "Falta tenant_id" });

  try {
    const results = await busquedaRepository.busquedaGlobal(q, tenantId);
    res.json(results);
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json([]);
  }
});

module.exports = router;