router.get("/", async (req, res) => {
  const tenantId = parseInt(req.headers["x-tenant-id"]);

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant requerido" });
  }

  try {
    const [results] = await db.query(`
      SELECT 
        p.id_producto,
        p.nombre,
        p.stock,
        c.nombre AS categoria
      FROM producto p
      LEFT JOIN categoria c 
        ON p.id_categoria = c.id_categoria
      WHERE p.id_tenant = ?
    `, [tenantId]);

    res.json(results);
  } catch (err) {
    console.error("ERROR PRODUCTOS:", err);
    res.status(500).json({ error: err.message });
  }
});